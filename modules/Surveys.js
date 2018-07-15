import {NativeModules, NativeAppEventEmitter, DeviceEventEmitter, Platform} from "react-native";
let {Instabug} = NativeModules;

/**
 * Surveys
 * @exports Surveys
 */
module.exports = {

    /**
     * @summary Shows one of the surveys that were not shown before, that also have conditions
     * that match the current device/user.
     * Does nothing if there are no available surveys or if a survey has already been shown
     * in the current session.
     */
    showSurveyIfAvailable: function () {
        Instabug.showSurveysIfAvailable()
    },

    /**
      * Sets a threshold for numbers of sessions and another for number of days
      * required before a survey, that has been dismissed once, would show again.
      * @param {number} sessionCount Number of sessions required to be
      *                initialized before a dismissed survey can be shown again.
      * @param {number} daysCount Number of days required to pass before a
      *                dismissed survey can be shown again.
      */
     setThresholdForReshowingSurveyAfterDismiss: function (sessionCount, daysCount) {
        Instabug.setThresholdForReshowingSurveyAfterDismiss(sessionCount, daysCount);
    },

    /**
     * Returns an array containing the available surveys.
     * @param {availableSurveysCallback} availableSurveysCallback callback with
     * argument available surveys
     *
     */
    getAvailableSurveys: function(availableSurveysCallback) {
        Instabug.getAvailableSurveys(availableSurveysCallback)
    },

    /**
      * Sets whether auto surveys showing are enabled or not.
      * @param autoShowingSurveysEnabled A boolean to indicate whether the
      *                                surveys auto showing are enabled or not.
      *
      */
     setAutoShowingEnabled: function(autoShowingSurveysEnabled) {
        Instabug.setAutoShowingSurveysEnabled(autoShowingSurveysEnabled);
    },

    /**
     * @summary Sets a block of code to be executed just before the survey's UI is presented.
     * This block is executed on the UI thread. Could be used for performing any UI changes before
     * the survey's UI is shown.
     * @param {function} willShowSurveyHandler - A block of code that gets executed before
     * presenting the survey's UI.
     */
    onShowCallback: function (willShowSurveyHandler) {
        if (Platform.OS === 'ios') {
            Instabug.addListener('IBGWillShowSurvey');
            NativeAppEventEmitter.addListener(
                'IBGWillShowSurvey',
                willShowSurveyHandler
            );
        } else {
            DeviceEventEmitter.addListener('IBGWillShowSurvey', willShowSurveyHandler);
        }

        Instabug.setWillShowSurveyHandler(willShowSurveyHandler);

    },

    /**
     * @summary Sets a block of code to be executed right after the survey's UI is dismissed.
     * This block is executed on the UI thread. Could be used for performing any UI
     * changes after the survey's UI is dismissed.
     * @param {function} didDismissSurveyHandler - A block of code that gets executed after
     * the survey's UI is dismissed.
     */
    onDismissCallback: function (didDismissSurveyHandler) {
        if (Platform.OS === 'ios') {
            Instabug.addListener('IBGDidDismissSurvey');
            NativeAppEventEmitter.addListener(
                'IBGDidDismissSurvey',
                didDismissSurveyHandler
            );
        } else {
            DeviceEventEmitter.addListener('IBGDidDismissSurvey', didDismissSurveyHandler);
        }

        Instabug.setDidDismissSurveyHandler(didDismissSurveyHandler);

    },

    /**
     * Shows survey with a specific token.
     * Does nothing if there are no available surveys with that specific token.
     * Answered and cancelled surveys won't show up again.
     * @param {string} surveyToken - A String with a survey token.
     *
     */
    showSurvey: function (surveyToken) {
        Instabug.showSurveyWithToken(surveyToken);
    },

    /**
     * Returns true if the survey with a specific token was answered before.
     * Will return false if the token does not exist or if the survey was not answered before.
     * @param {string} surveyToken - A String with a survey token.
     * @param {function} surveyTokenCallback callback with argument as the desired value of the whether
     * the survey has been responded to or not.
     *
     */
    hasRespondedToSurvey: function (surveyToken, surveyTokenCallback) {
        Instabug.hasRespondedToSurveyWithToken(surveyToken, surveyTokenCallback);
    },

    /**
     * Setting an option for all the surveys to show a welcome screen before
     * the user starts taking the survey.
     * @param shouldShowWelcomeScreen A boolean for setting whether the
     *                                welcome screen should show.
     *
     */
    setShouldShowWelcomeScreen: function(shouldShowWelcomeScreen) {
        Instabug.setShouldShowSurveysWelcomeScreen(shouldShowWelcomeScreen);
    },
}