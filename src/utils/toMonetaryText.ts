import _ from '../lodash';

export function toMonetaryText(value: number | string, monetarySign: string) {
  return _.flow([
    (v) => (_.isNil(v) ? 0 : v),
    (v) => new Intl.NumberFormat().format(v),
    (s) => `${s}${monetarySign}`,
  ])(value);
}
