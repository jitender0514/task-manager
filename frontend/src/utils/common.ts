import moment from "moment";

export const remainingSecondsLeft = (timeLeftStr: string, fromDate?: string): number => {
    const seconds = fromDate ? moment(timeLeftStr).diff(moment(fromDate),'seconds') : moment(timeLeftStr).diff(moment(),'seconds');
    return seconds > 0 ? seconds : 0;
};


export const remainingHumanReadableTimeLeft = (timeLeftStr: string, suffix: boolean = false, fromDate?: string): string =>  {
    return fromDate ? moment(timeLeftStr).from(moment(fromDate), suffix) : moment(timeLeftStr).from(moment(), suffix);
}


export const getBgColorClass = (seconds: number): string => {
    
    let bgColorClass: string = "border-l-8 border-r border-t border-b border-l-gray-200";

    if (seconds <= 0) {
        bgColorClass = "border-l-8 border-r border-t border-b border-rose-400";
    } 

    if (0 < seconds && seconds <= 300) {
        bgColorClass = "border-l-8 border-r border-t border-b border-l-orange-400";
    }

    if (300 < seconds && seconds <= 600) {
        bgColorClass = "border-l-8 border-r border-t border-b border-l-amber-400";
    }

    if (600 < seconds && seconds <= 1800) {
        bgColorClass = "border-l-8 border-r border-t border-b border-l-yellow-400";
    }

    return bgColorClass;

}