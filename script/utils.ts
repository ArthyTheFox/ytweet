import { DateTime } from "luxon";
import type { UserMessage } from "../src/types";

export default class Utils {

    colors: {
        'main': '#25232e';
        'main-fonce': '#191820';
        'extra': '#23b2a4';
    }

    static dateWithYearMessageFormat(date: DateTime): string {
        return date.toFormat("d MMMM y, HH:mm");
    }

    static dateWithHourMessageFormat(date: DateTime): string {
        return date.toFormat("d MMMM, HH:mm");
    }

    static dateWithYearFormat(date: DateTime): string {
        return date.toFormat("d MMMM y");
    }

    static dateWithHourFormat(date: DateTime): string {
        return date.toFormat("d MMMM");
    }

    static sameDateFromStr(dateMessage1: string, dateMessage2: string): boolean {
        return (
            Utils.sameDayFromStr(dateMessage1, dateMessage2) &&
            Utils.sameMonthFromStr(dateMessage1, dateMessage2) &&
            Utils.sameYearFromStr(dateMessage1, dateMessage2)
        );
    }

    static sameDayFromStr(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromISO(dateMessage1).day ===
            DateTime.fromISO(dateMessage2).day
        );
    }

    static sameMonthFromStr(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromISO(dateMessage1).month ===
            DateTime.fromISO(dateMessage2).month
        );
    }

    static sameYearFromStr(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromISO(dateMessage1).year ===
            DateTime.fromISO(dateMessage2).year
        );
    }

    static stringToColour(str: string) {
        var hash: number = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = "";
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xff;
            colour += ("00" + value.toString(16)).substr(-2);
        }
        return colour;
    }

    static formatUser(user: UserMessage) {
        return user.firstname + " " + user.lastname;
    }

    static imageUser(user: UserMessage) {
        return "https://ui-avatars.com/api/?name=" + Utils.formatUser(user) + "&color=" + Utils.stringToColour(Utils.formatUser(user)) + "&background=121212"
    }

    static borderClass(user: UserMessage) {
        return `border border-[#${Utils.stringToColour(Utils.formatUser(user))}]`;
    }
}