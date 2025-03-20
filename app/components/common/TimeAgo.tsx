import { parseISO, formatDistanceToNowStrict } from "date-fns";

interface Props {
    timeStamp: string;
}

const TimeAgo = ({ timeStamp }: Props) => {
    let timeAgo = ''
    if (timeStamp) {
        const date = parseISO(timeStamp)
        const timePeriod = formatDistanceToNowStrict(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timeStamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo