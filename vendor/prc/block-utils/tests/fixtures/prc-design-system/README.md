# Fixture: prc-design-system

Minimal snapshot of the PRC Design System theme for PHPUnit / wp-env. The `theme.json` is copied from the monorepo `themes/prc-design-system/` so `wp_get_global_settings()` exposes the real color palette in tests.

Refresh from the platform repo:

```bash
bash bin/sync-design-system.sh
```

(from the `prc-block-utils` repo root, or set `PRC_PLATFORM_PATH` to your `prc-platform` checkout)
