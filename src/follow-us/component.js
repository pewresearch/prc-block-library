import { Component, Fragment, RawHTML } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { Card, Checkbox, Form, Input, Dimmer } from 'semantic-ui-react';
import classNames from 'classnames/bind';

const { interests } = window.prcFollowUsMailchimp;
const newsletters = interests;

class FollowUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
            dimmed: false,
            message: '',
            selected: [],
        };
        this.setState = this.setState.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount = () => {
        if (undefined !== this.props.editMode && true === this.props.editMode) {
            const selected = this.props.newsletters.split(',');
            if (0 !== selected.length) {
                this.setState({ selected });
            }
        }
    };

    selectNewsletter = ID => {
        const { selected } = this.state;

        if (selected.includes(ID)) {
            // If currently selected then remove
            const index = selected.indexOf(ID);
            if (-1 < index) {
                selected.splice(index, 1);
            }
        } else {
            selected.push(ID);
        }

        this.setState({ selected });
    };

    isSelected = ID => {
        if (this.props.newsletters.split(',').includes(ID)) {
            return true;
        }
        return false;
    };

    submitHandler = e => {
        const { setState } = this;
        const interest = this.state.selected.join();
        const { email } = this.state;
        const state = {
            dimmed: true,
            loading: false,
            message: '',
        };

        setState({ loading: true });

        apiFetch({
            path: `/prc-api/v2/mailchimp/subscribe/?email=${email}&interests=${interest}`,
            method: 'POST',
        })
            .then(() => {
                state.message =
                    'You have succesfully subsrcibed to these newsletter(s)';
            })
            .catch(err => {
                state.message =
                    'Unfortunately we could not susbscribe you at this time. Please try again later.';
            })
            .finally(() => {
                setState(state);
            });
    };

    selectNewsletters = () => {
        const update = ID => {
            const { selected } = this.state;

            if (selected.includes(ID)) {
                // If currently selected then remove "toggle"
                const index = selected.indexOf(ID);
                if (-1 < index) {
                    selected.splice(index, 1);
                }
            } else {
                selected.push(ID);
            }

            // Update the selection of newsletters in the context of the sidebar:
            this.setState({ selected });
            // Covnert array to string for data storage:
            this.props.setAttributes({ newsletters: selected.join() });
        };

        const isSelected = ID => {
            if (this.state.selected.includes(ID)) {
                return true;
            }
            return false;
        };

        return (
            <Fragment>
                {newsletters.map((item, index) => {
                    return (
                        <div className="item">
                            <Form.Field>
                                <Checkbox
                                    label={item.label}
                                    value={item.value}
                                    checked={isSelected(item.value)}
                                    className="sans-serif"
                                    onChange={(e, data) => update(data.value)}
                                />
                            </Form.Field>
                        </div>
                    );
                })}
            </Fragment>
        );
    };

    render = () => {
        const classes = classNames(this.props.className, 'inverted', 'beige');
        const SelectNewsletters = this.selectNewsletters;
        return (
            <Card fluid className={classes} style={{ marginBottom: '35px' }}>
                <Card.Header>Follow Us</Card.Header>
                <Dimmer.Dimmable
                    as="div"
                    className="content"
                    dimmed={this.state.dimmed}
                >
                    <div className="ui sub header">Social Media</div>
                    {/* Edit */}
                    {false !== this.props.setAttributes && (
                        <RichText
                            tagName="ul"
                            value={this.props.socialMedia}
                            onChange={socialMedia => {
                                this.props.setAttributes({ socialMedia });
                            }}
                            formattingControls={['link']}
                            placeholder={this.props.socialMedia}
                            multiline="li"
                            className="ui link list"
                        />
                    )}
                    {/* Display */}
                    {false === this.props.setAttributes &&
                        true === this.props.editMode &&
                        this.props.children}
                    {false === this.props.setAttributes &&
                        undefined === this.props.editMode && (
                            <RawHTML>{this.props.children}</RawHTML>
                        )}

                    <div className="ui sub header">Newsletters</div>
                    <Form onSubmit={this.submitHandler}>
                        <div className="ui list">
                            {false === this.props.setAttributes &&
                                newsletters.map((item, index) => {
                                    if (this.isSelected(item.value)) {
                                        return (
                                            <div className="item">
                                                <Form.Field>
                                                    <Checkbox
                                                        label={item.label}
                                                        value={item.value}
                                                        className="sans-serif"
                                                        onChange={(e, data) =>
                                                            this.selectNewsletter(
                                                                data.value,
                                                            )
                                                        }
                                                    />
                                                </Form.Field>
                                            </div>
                                        );
                                    }
                                })}
                            {false !== this.props.setAttributes && (
                                <SelectNewsletters />
                            )}
                        </div>

                        <Form.Field required>
                            <Input
                                fluid
                                size="mini"
                                action={{
                                    color: 'secondary',
                                    size: 'mini',
                                    content: 'Sign Up',
                                    loading: this.state.loading,
                                    style: {
                                        justifyContent: 'center',
                                        width: 'auto',
                                    },
                                }}
                                type="email"
                                placeholder="Email Address"
                                value={this.state.email}
                                disabled={this.state.loading}
                                onChange={e =>
                                    this.setState({ email: e.target.value })
                                }
                            />
                        </Form.Field>
                    </Form>

                    <Dimmer
                        active={this.state.dimmed}
                        onClickOutside={() => {
                            this.setState({ dimmed: false });
                        }}
                    >
                        <p className="sans-serif">
                            {this.state.message} (Click to close)
                        </p>
                    </Dimmer>
                </Dimmer.Dimmable>
            </Card>
        );
    };
}

export default FollowUs;
