import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {List, fromJS} from 'immutable';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import momentWeekdays from '@/components/moment-weekdaysin';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './scheduler.css';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
momentWeekdays(moment);

const allViews = ['month', 'week'];

const messages = {
    allDay: 'Весь день',
    previous: 'Назад',
    next: 'Вперёд',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Список',
    date: 'Дата',
    time: 'Время',
    event: 'Занятие',
};
const daysOfWeeks = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
};
export default class SchedulerClass extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onNavigate = this.onNavigate.bind(this);
        this.onView = this.onNavigate.bind(this);
        this.prepareData = this.prepareData.bind(this);
        this.state = {data:[], teacherMode:true};
    }
    componentWillMount() {
        this.prepareData(stub, new Date());
    }
    onNavigate(date) {
        this.prepareData(stub, date);
    }

    fromEvent(e, startDate) {
        return {
            id: e.get('id'),
            start: startDate || e.get('date'),
            end: moment(startDate || e.get('date')).add(e.get('durationMinutes'), 'm').toDate(),
            title: `${this.state.teacherMode ? e.get('name') : e.get('teacher')} - ${e.get('description')}`,
            desc: e.get('description')
        };
    }
    prepareData(eventData, date) {
        if (eventData) {
            const data = [];
            eventData.forEach(e => {
                if (!e.get('recurring')) {
                    data.push(this.fromEvent(e));
                }else{
                    if (e.get('recurringDays')) {
                        e.get('recurringDays').forEach(weekDay=>{
                            const daysThisMonth = moment(date).weekdaysInMonth(daysOfWeeks[weekDay]);
                            if (daysThisMonth) {
                                daysThisMonth.forEach(day=>{
                                    const eventDate = day.clone();
                                    eventDate.hours(e.get('date').getHours());
                                    eventDate.minutes(e.get('date').getMinutes());
                                    data.push(this.fromEvent(e, eventDate.toDate()));
                                });
                            }
                        });
                    }
                }
            });
            this.setState({data});
        }
    }
    render() {
        return (
      <div className="scheduler">
        <Row>
          <Col xs={12}>
            <BigCalendar culture="ru" popup messages={messages} onNavigate={this.onNavigate} events={this.state.data} views={allViews} defaultDate={new Date()}/>
          </Col>
        </Row>
      </div>);
    }
}

const stub =  fromJS([
    {
        id: 0,
        name: 'Илья!',
        allDay: true,
        date: new Date(2018, 0, 20, 18, 0, 0),
        durationMinutes:120,
        teacher:'Люба',
        description:'Учим алфавит',
        recurring: true,
        recurringDays:['THURSDAY']
    }, {
        id: 0,
        name: 'Не Илья :(',
        allDay: true,
        date: new Date(2018, 0, 20, 15, 0, 0),
        durationMinutes:90,
        teacher:'Люба',
        description:'Какой-то там урок',
        recurring: true,
        recurringDays:['THURSDAY']
    }, {
        id: 0,
        name: 'Не Илья :(',
        allDay: true,
        date: new Date(2018, 0, 20, 12, 0, 0),
        durationMinutes:60,
        teacher:'Люба',
        description:'Описание урока',
        recurring: true,
        recurringDays:['THURSDAY']
    }, {
        id: 0,
        name: 'Кухня',
        allDay: true,
        date: new Date(2018, 0, 20, 13, 0, 0),
        durationMinutes:120,
        teacher:'Люба',
        description:'Eat yummies like there is no tommorow',
        recurring: true,
        recurringDays:['THURSDAY']
    }, {
        id: 0,
        name: 'Не Илья :(',
        allDay: true,
        date: new Date(2018, 0, 20, 16, 0, 0),
        durationMinutes:90,
        teacher:'Люба',
        description:'Не забыть дать домашку!',
        recurring: true,
        recurringDays:['TUESDAY']
    }, {
        id: 0,
        name: 'Не Илья :(',
        allDay: true,
        date: new Date(2018, 0, 20, 11, 0, 0),
        durationMinutes:90,
        teacher:'Люба',
        description:'Не опоздать!',
        recurring: true,
        recurringDays:['TUESDAY']
    }, {
        id: 0,
        name: 'Кухня',
        allDay: true,
        date: new Date(2018, 0, 20, 12, 30, 0),
        durationMinutes:120,
        teacher:'Люба',
        description:'Eat yummies like there is no tommorow',
        recurring: true,
        recurringDays:['TUESDAY']
    }, {
        id: 0,
        name: 'Не Илья :(',
        allDay: true,
        date: new Date(2018, 0, 20, 14, 30, 0),
        durationMinutes:90,
        teacher:'Люба',
        description:'Проверить домашку!',
        recurring: true,
        recurringDays:['TUESDAY']
    },
]
  );
