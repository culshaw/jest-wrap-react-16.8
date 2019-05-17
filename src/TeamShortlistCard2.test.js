import React from "react";
import Enzyme, { mount } from "enzyme";
import TeamShortlistCard from "./TeamShortlistCard";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    freelancers: [
        {
            id: 1,
            rate: 200.0,
            jobtitle: "Creative director",
            user: { userId: 123 },
            ownership: null
        },
        {
            id: 2,
            rate: 150.0,
            jobtitle: "Copywriter",
            user: { userId: 234 },
            ownership: null
        }
    ],
    totalCombinedRate: 350.0,
    id: 1234,
    isBy: false,
    isOffered: false,
    latestMessage: {
        message: "This was the last message"
    },
    ownership: false,
    onRemoveApplicant: jest.fn(),
    profileUrl: "/t/ingen",
    context: {
        Note: "This is a string"
    },
    showActionButtons: true,
    showConversation: true,
    showRates: true,
    title: "InGen",
    unreadMessages: false,
    urls: [
        {
            category: "other",
            url: "http://google.com"
        },
        {
            category: "personal",
            url: "http://ingen.com"
        }
    ],
    i18nStrings: {}
};

describe("<TeamShortlistCard (same tests as TeamShortlistCard.test.js just not wrapped) />", () => {
    test("Ensure onChange is triggered through Modal props", () => {
        const mountedComponent = mount(
            <TeamShortlistCard {...defaultProps} isBy={true} />
        );

        expect(mountedComponent.state("feedbackValue")).toBe("");

        // Find textarea field in modal
        expect(mountedComponent.find(".FreelancerCard-newDetails").text()).toBe("NameCreative director and Copywriter");
    });

    test("isRemovalSubmitting triggers", () => {
        const mountedComponent = mount(
            <TeamShortlistCard {...defaultProps} isBy={true} />
        );

        expect(mountedComponent.state("isRemovalSubmitting")).toBe(false);
        expect(defaultProps.onRemoveApplicant).not.toHaveBeenCalled();
        mountedComponent.instance()._onRemoveApplicant(123, {
            key: "value"
        });

        expect(mountedComponent.state("isRemovalSubmitting")).toBe(true);
        expect(defaultProps.onRemoveApplicant).toHaveBeenCalled();

        // Beep boop, we're going to receive some props.
        mountedComponent.instance().componentWillUpdate();
        expect(mountedComponent.state("isRemovalSubmitting")).toBe(false);
    });

    test("isRemovalSubmitting via lifecycle methods", () => {
        defaultProps.onRemoveApplicant.mockReset();
        const mountedComponent = mount(
            <TeamShortlistCard {...defaultProps} isBy={true} />
        );

        expect(mountedComponent.state("isRemovalSubmitting")).toBe(false);
        expect(defaultProps.onRemoveApplicant).not.toHaveBeenCalled();
        mountedComponent.instance()._onRemoveApplicant(123, {
            key: "value"
        });

        expect(mountedComponent.state("isRemovalSubmitting")).toBe(true);
        expect(defaultProps.onRemoveApplicant).toHaveBeenCalled();

        // Beep boop, we're going to receive some props.
        mountedComponent.instance().componentWillUnmount();
        expect(mountedComponent.state("isRemovalSubmitting")).toBe(false);
    });
});