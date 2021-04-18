/* @flow */
import * as React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Day from './Day';
import { getDayNames, isValidDate } from '../utils/date';
import { getDaysOfMonth } from '../utils';
import type { MonthType, DayType, ThemeType, LocaleType } from '../types';
import PText from '../../../../App/Components/PText';

class EmptyMonth extends React.Component<{
  name: string,
  theme: ThemeType,
  height: number,
}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { theme, name, height } = this.props;

    return (
      <View
        style={[
          {
            height,
            justifyContent: 'center',
            alignItems: 'center',
          },
          theme.emptyMonthContainerStyle,
        ]}
      >
        <PText
          style={[{ fontSize: 25, fontWeight: '300' }, theme.emptyMonthTextStyle]}
          allowFontScaling={false}
        >
          {name}
        </PText>
      </View>
    );
  }
}

class WeekColumns extends React.Component<{
  days: Array<string>,
  theme: ThemeType,
}> {
  shouldComponentUpdate() {
    return false;
  }

  renderWeekText = (day: string, i: number) => (
    <View key={i} style={[{ flex: 1, alignItems: 'center' }, this.props.theme.weekColumnStyle]}>
      <PText allowFontScaling={false} style={this.props.theme.weekColumnTextStyle}>
        {day}
      </PText>
    </View>
  );

  render() {
    return (
      <View style={[{ flexDirection: 'row' }, this.props.theme.weekColumnsContainerStyle]}>
        {this.props.days.map(this.renderWeekText)}
      </View>
    );
  }
}

class MonthTitle extends React.Component<{ name: string, theme: ThemeType }> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <PText
        allowFontScaling={false}
        style={[{ textAlign: 'center', paddingVertical: 10 }, this.props.theme.monthTitleTextStyle]}
      >
        {this.props.name}
      </PText>
    );
  }
}

type PropsType = {
  onPress: Date => void,
  month: MonthType,
  theme: ThemeType,
  showWeekdays: boolean,
  showMonthTitle: boolean,
  firstDayMonday: boolean,
  locale: LocaleType,
  dayNames: Array<string>,
  height: number,
  renderDayContent?: DayType => React.Node,
  minDate?: string,
  maxDate?: string,
  startDate: ?Date,
  endDate: ?Date,
  disableRange: boolean,
  disabledDays: { [key: string]: any },
  extraData: any,
};

export default class Month extends React.Component<PropsType> {
  static defaultProps = {
    renderDayContent: null,
    minDate: null,
    maxDate: null,
  };

  shouldComponentUpdate(nextProps: PropsType) {
    return (
      this.props.month.isVisible !== nextProps.month.isVisible ||
      this.props.startDate !== nextProps.startDate ||
      this.props.minDate !== nextProps.minDate ||
      this.props.maxDate !== nextProps.maxDate ||
      this.props.endDate !== nextProps.endDate ||
      this.props.extraData !== nextProps.extraData
    );
  }

  getDayList = () => {
    const {
      month: { monthNumber, year },
      startDate,
      endDate,
      firstDayMonday,
      minDate,
      maxDate,
      disableRange,
      disabledDays,
    } = this.props;

    const min =
      minDate && isValidDate(new Date(minDate)) ? moment(minDate, 'YYYY-MM-DD').toDate() : null;
    const max =
      maxDate && isValidDate(new Date(maxDate)) ? moment(maxDate, 'YYYY-MM-DD').toDate() : null;

    return getDaysOfMonth(
      monthNumber,
      year,
      startDate,
      endDate,
      min,
      max,
      disableRange,
      firstDayMonday,
      disabledDays,
    );
  };

  renderWeek = (week: Array<DayType>, index: number) => (
    <View key={index} style={{ flexDirection: 'row' }}>
      {week.map(this.renderDay)}
    </View>
  );

  renderDay = (day: DayType, index: number) => (
    <Day
      key={index}
      item={day}
      onPress={this.props.onPress}
      theme={this.props.theme}
      renderDayContent={this.props.renderDayContent}
    />
  );

  render() {
    const {
      month: { name },
      showWeekdays,
      showMonthTitle,
      firstDayMonday,
      theme,
      dayNames,
      height,
      locale,
    } = this.props;

    const DAY_NAMES = dayNames.length ? dayNames : getDayNames(locale, firstDayMonday);
    const days = this.getDayList();
    const weeks = [];

    while (days.length) {
      weeks.push(days.splice(0, 7));
    }

    return (
      <View style={{ height }}>
        {showMonthTitle && <MonthTitle name={name} theme={theme} />}
        {showWeekdays && <WeekColumns days={DAY_NAMES} theme={theme} />}
        {weeks.map(this.renderWeek)}
      </View>
    );
  }
}
