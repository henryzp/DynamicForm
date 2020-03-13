import React, { FC } from 'react';
import { PropsType } from 'antd-mobile/es/date-picker/index';
import { DatePicker, List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import Field from '../Field';
import { changeDateFormat } from '../../utils';

import '../../styles/index.less';

export interface INomarDatePickerProps extends PropsType {
  modeType?: PropsType['mode'];
  fieldProps: string;
  required?: boolean;
  title: string;
  rules?: Rule[];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
}

const NomarDatePicker: FC<INomarDatePickerProps> = props => {
  const {
    fieldProps,
    required = false,
    title,
    rules,
    modeType = 'date',
    positionType = 'horizontal',
    hasStar = true,
    subTitle,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <>
      {isVertical && (
        <div className="alitajs-dform-vertical-title">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
          {subTitle}
        </div>
      )}
      <div className={`alitajs-dform${isVertical ? '-vertical' : ''}-date-picker`}>
        <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
          <DatePicker
            {...otherProps}
            mode={modeType}
            title={title}
            format={value => changeDateFormat(value, modeType)}
          >
            <List.Item arrow="horizontal">
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={fieldProps} className="alitajs-dform-title">
                {title}
              </span>
            </List.Item>
          </DatePicker>
        </Field>
      </div>
    </>
  );
};

export default NomarDatePicker;
