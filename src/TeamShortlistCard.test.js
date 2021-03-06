import wrap from "jest-wrap";
import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import TeamShortlistCard from "./TeamShortlistCard";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const mockYJ = {
    Brief: {
        currency: "GBP"
    },
    Conversation: {
        conversationUpdated: {
            attach: () => {},
            detach: () => {}
        }
    },
    i18n: {
        react: {
            localised_currency: "${currencySymbol}${value}"
        }
    }
};

const mockWindow = {
    ...window,
    getComputedStyle: () => {
        return { getPropertyValue: () => {} };
    },
    requestAnimationFrame: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
};

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

wrap()
    .withGlobal("YJ", () => mockYJ)
    .withGlobal("window", () => mockWindow)
    .describe("<TeamShortlistCard (mocked YJ and window) />", () => {

        test("(shallow) Ensure onChange is triggered through Modal props", () => {
            // Shallow for comparison
            const shallowComponent = shallow(
                <TeamShortlistCard {...defaultProps} isBy={true} />
            );
    
            expect(shallowComponent.state("feedbackValue")).toBe("");
    
            // Find textarea field in modal
            expect(shallowComponent.find(".FreelancerCard-newDetails").text()).toBe("NameCreative director and Copywriter");
        });

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

wrap()
    .withGlobal("YJ", () => mockYJ)
    .describe("<TeamShortlistCard (mocked YJ) />", () => {
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