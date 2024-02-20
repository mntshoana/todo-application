import TaskStatus from '../enumerator/TaskStatus';

class Task {
    id: number;
    date: Date;
    title: String;
    description: String;
    isDone: Boolean;

    constructor(id: number, date: Date, title: String, description: String = "", isDone: Boolean = false) {
        this.id = id
        this.date = date;
        this.title = title;
        this.description = description;
        this.isDone = false;
    }

    getStatus = () => {
        if (this.isDone == true)
            return "done"
        else if (this.isNow())
            return "now"
        else if (this.isOverdue())
            return "overdue"
        else if (this.isUpcoming())
            return "upcoming"
        else
            return "no status"
    }

    isToday = (): boolean => {
        const today = new Date();
        return this.date.getFullYear() === today.getFullYear()
            && this.date.getMonth() === today.getMonth()
            && this.date.getDay() === today.getDay();
    }

    isNow = (): boolean => {
        const today = new Date();
        return !this.isDone
        && this.isToday() 
        && (today.getTime() - this.date.getTime() <= 1800 * 1000);
    }
    isOverdue = (): boolean => {
        const today = new Date();
        return !this.isNow() && this.date > today
    }

    isUpcoming = (): boolean => {
        return !this.isOverdue();
    }
}

export { Task };