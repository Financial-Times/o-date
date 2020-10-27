export default ODate;
/**
 * Initialise the o-date component.
 * @param {HTMLElement|String} rootElement - The root element or CSS selector to initialise
 */
declare class ODate {
    /**
     * Initialise the o-date component.
     * @param {HTMLElement|String} el - The root element or CSS selector to initialise
     * @returns {Array<ODate> | ODate} - An o-date instance or array of o-date instances.
     */
    static init(el: HTMLElement | string): Array<ODate> | ODate;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static toDate(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static format(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static getSecondsBetween(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static ftTime(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static isNearFuture(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static isFarFuture(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static isToday(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static isYesterday(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static timeAgo(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static asTodayOrYesterdayOrNothing(...args: any[]): string;
    /**
     * @deprecated Use [ft-date-format]{@link https://github.com/Financial-Times/ft-date-format} instead.
     * @return {String} - A formatted date or empty string.
     */
    static timeAgoNoSeconds(...args: any[]): string;
    constructor(rootEl: any);
    el: any;
    handleEvent(e: any): void;
    /**
     * Re-render the formatted date within the `time` element.
     * @returns {undefined}
     */
    update(): undefined;
    /**
     * Remove o-date from the `time` element i.e. remove event
     * listeners and drop references to the element.
     * @returns {undefined}
     */
    destroy(): undefined;
    /**
     * Render the date to the "printer" element in the requested format.
     * @param {HTMLElement} printer - The element to render the date in
     * @param {Date} date - The date to format
     * @returns {undefined}
     */
    _renderDateFor(printer: HTMLElement, date: Date): undefined;
}
