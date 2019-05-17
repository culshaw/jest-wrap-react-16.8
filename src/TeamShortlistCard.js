import React, { Component } from "react";

export default class TeamShortlistCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedbackValue: "",
            isRemovalSubmitting: false,
        };
    }

    componentWillUpdate() {
        if (this.state.isRemovalSubmitting) {
            this.setState({
                isRemovalSubmitting: false
            });
        }
    }

    componentWillUnmount() {
        if (this.state.isRemovalSubmitting) {
            this.setState({
                isRemovalSubmitting: false
            });
        }
    }

    _onChangeFeedback(ev) {
        this.setState({
            feedbackValue: ev.target.value
        });
    }

    _onRemoveApplicant(id, payload) {
        this.setState(
            {
                isRemovalSubmitting: true
            },
            function() {
                this.props.onRemoveApplicant(id, payload);
            }
        );
    }

    render() {
        return (
            <div>
                <div className="u-paddingTop--3">
                    <div className="FreelancerCard-newBody">
                        <div className="FreelancerCard-mediaInner">
                        </div>
                        <div className="FreelancerCard-newDetails">
                            <a href="./asdsa">Name</a>
                            <p>
                                {this.props.freelancers[0].jobtitle} and{" "}
                                {this.props.freelancers[1].jobtitle}
                            </p>

                            
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
