import React, { FC } from 'react';
import { InputItem, Picker, List } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import classnames from 'classnames';
import { Rule } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import Field from '../Field';
import { NomarInput } from '..';
import '../../styles/index.less';

export interface IExtraInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  fieldProps: string;
  fieldProps2?: string;
  placeholder2?: string;
  required?: boolean;
  rules?: Rule[];
  title: string;
  coverStyle?: React.CSSProperties;
  extraType?: 'input' | 'select';
  positionType?: 'vertical' | 'horizontal';
  data?: any;
  hasStar?: boolean;
  firstProps?: InputItemPropsType;
  secondProps?: any;
  subTitle?: string | React.ReactNode;
}

const ExtraInput: FC<IExtraInputProps> = props => {
  const {
    inputType = 'text',
    fieldProps,
    fieldProps2,
    title,
    required,
    rules,
    coverStyle,
    placeholder2,
    extraType = 'input',
    positionType = 'vertical',
    hasStar = true,
    data,
    firstProps,
    secondProps,
    subTitle,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const extraDiv = () => {
    if (extraType === 'select') {
      return (
        <Field name={fieldProps2} rules={rules || [{ required, message: `请输入${title}` }]}>
          <Picker
            {...secondProps}
            style={coverStyle}
            title={title}
            data={data}
            cascade={false}
            extra={placeholder2}
          >
            <List.Item arrow="horizontal"></List.Item>
          </Picker>
        </Field>
      );
    }

    return (
      <Field name={fieldProps2} rules={rules || [{ required, message: `请输入${title}` }]}>
        <InputItem
          {...otherProps}
          {...secondProps}
          type={inputType}
          style={{ textAlign: 'right', ...coverStyle }}
          placeholder={placeholder2}
        />
      </Field>
    );
  };

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
      <div
        className={classnames({
          'alitajs-dform-extra-input': true,
          'alitajs-dform-extra-horizontal': !isVertical,
        })}
      >
        <div className={`alitajs-dform-begin${isVertical ? '-vertical' : ''}-input`}>
          <NomarInput
            {...otherProps}
            {...firstProps}
            required={required}
            rules={rules}
            coverStyle={{ textAlign: 'left', ...coverStyle }}
            fieldProps={fieldProps}
            title={title}
            extra=""
          />
        </div>
        {extraType === 'input' && <div className="alitajs-dform-line">~</div>}
        <div
          className={`alitajs-dform-end${isVertical ? '-vertical' : ''}-input`}
          style={{ width: isVertical ? '' : '' }}
        >
          {extraDiv()}
        </div>
      </div>
    </>
  );
};

export default ExtraInput;
