import { DateTime } from "luxon";
import type { User } from "../src/types";

export default class Utils {

    static dateFormat = 'yyyy-MM-dd HH:mm:ss';

    colors: {
        'main': '#25232e';
        'main-fonce': '#191820';
        'extra': '#23b2a4';
    }

    static traductionDate(date: string): string {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthsTrad = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        let changed = false;
        let index = 0;
        while (!changed && index < months.length) {
            if (date.includes(months[index])) {
                changed = true;
                date = date.replace(months[index], monthsTrad[index]);
            }
            index++;
        }
        return date;
    }

    static dateWithYearMessageFormat(date: DateTime): string {
        return this.traductionDate(date.toFormat("d MMMM y"));
    }

    static dateMessageFormat(date: DateTime): string {
        return this.traductionDate(date.toFormat("d MMMM, HH:mm"));
    }

    static dateWithYearFormat(date: DateTime): string {
        return this.traductionDate(date.toFormat("d MMMM y"));
    }

    static dateWithHourFormat(date: DateTime): string {
        return this.traductionDate(date.toFormat("d MMMM"));
    }

    static timeFormat(date: DateTime): string {
        return date.toFormat("HH:mm");
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
            DateTime.fromFormat(dateMessage1, this.dateFormat).day ===
            DateTime.fromFormat(dateMessage2, this.dateFormat).day
        );
    }

    static sameMonthFromStr(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromFormat(dateMessage1, this.dateFormat).month ===
            DateTime.fromFormat(dateMessage2, this.dateFormat).month
        );
    }

    static sameYearFromStr(dateMessage1: string, dateMessage2: string): boolean {
        return (
            DateTime.fromFormat(dateMessage1, this.dateFormat).year ===
            DateTime.fromFormat(dateMessage2, this.dateFormat).year
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

    static formatUser(user: User) {
        if (!user) return '';
        return user.firstname + " " + user.lastname;
    }

    static imageUser(user: User) {
        if (!user) return '';
        return "https://ui-avatars.com/api/?name=" + Utils.formatUser(user) + "&color=" + Utils.stringToColour(Utils.formatUser(user)) + "&background=121212"
    }
}