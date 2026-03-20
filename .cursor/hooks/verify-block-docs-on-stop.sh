#!/bin/bash
# verify-block-docs-on-stop.sh — stop hook
# Ensures block docs are updated when block source files change.

set -euo pipefail

PROJECT_DIR="${CURSOR_PROJECT_DIR:-$(pwd)}"

input=$(cat)
status=$(echo "$input" | jq -r '.status // "completed"')
loop_count=$(echo "$input" | jq -r '.loop_count // 0')

# Only run on successful completion and avoid infinite follow-up loops.
if [[ "$status" != "completed" ]] || [[ "$loop_count" -ge 3 ]]; then
  echo '{}'
  exit 0
fi

cd "$PROJECT_DIR"

# Collect changed files (staged + unstaged vs HEAD) plus untracked.
changed_files=$(git diff --name-only HEAD 2>/dev/null || true)
untracked_files=$(git ls-files --others --exclude-standard 2>/dev/null || true)

if [[ -n "$untracked_files" ]]; then
  changed_files=$(printf "%s\n%s\n" "$changed_files" "$untracked_files")
fi

if [[ -z "$changed_files" ]]; then
  echo '{}'
  exit 0
fi

file_is_changed() {
  local target_file="$1"
  while IFS= read -r current_file; do
    [[ -z "$current_file" ]] && continue
    if [[ "$current_file" == "$target_file" ]]; then
      return 0
    fi
  done <<< "$changed_files"
  return 1
}

touched_blocks=$(
  while IFS= read -r file_path; do
    [[ -z "$file_path" ]] && continue
    if [[ "$file_path" == plugins/prc-block-library/src/* ]]; then
      remainder="${file_path#plugins/prc-block-library/src/}"
      block_slug="${remainder%%/*}"

      # Ignore hidden/underscore folders and direct files at src root.
      if [[ -n "$block_slug" ]] && [[ "$block_slug" != "$remainder" ]] && [[ "$block_slug" != .* ]] && [[ "$block_slug" != _* ]]; then
        echo "$block_slug"
      fi
    fi
  done <<< "$changed_files" | sort -u
)

# If no block source directories changed, do nothing.
if [[ -z "$touched_blocks" ]]; then
  echo '{}'
  exit 0
fi

missing_docs=()

while IFS= read -r block_slug; do
  [[ -z "$block_slug" ]] && continue
  expected_doc="plugins/prc-block-library/docs/${block_slug}.md"

  # Skip enforcement for blocks without a corresponding docs file.
  if [[ ! -f "$expected_doc" ]]; then
    continue
  fi

  if ! file_is_changed "$expected_doc"; then
    missing_docs+=("$expected_doc")
  fi
done <<< "$touched_blocks"

if [[ "${#missing_docs[@]}" -eq 0 ]]; then
  echo '{}'
  exit 0
fi

message="Block source changes were detected in prc-block-library, but matching docs were not updated.\n\nPlease update these docs files before finishing:\n"
for doc in "${missing_docs[@]}"; do
  message="${message}- ${doc}\n"
done

message="${message}\nRule: changes in plugins/prc-block-library/src/<block-slug>/... should include updates to plugins/prc-block-library/docs/<block-slug>.md when behavior, UI, data flow, or usage changed."

message_json=$(echo -e "$message" | jq -Rsa .)
echo "{\"followup_message\": $message_json}"

exit 0
