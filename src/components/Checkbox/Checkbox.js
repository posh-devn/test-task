// @flow
import * as React from 'react';
import cn from 'classnames';
import isFunction from 'lodash/isFunction';

import { ReactComponent as Icon } from '../../assets/MarkIcon.svg';
import {withHandlers} from "recompose";
import type {HOC} from "recompose/dist/Recompose.cjs";

import styles from './Checkbox.module.css';

type PropsCheckbox = {
  name: string,
  value: boolean,
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void
}

const Checkbox = ({onChange, value}: PropsCheckbox) => (
  <span onClick={onChange} className={styles.wrapper}>
    <span
      className={cn(styles.face, {
        [styles.checked]: value
      })}
    >
      {value && <Icon />}
    </span>
  </span>
)

const overrideOnChange: HOC<{
  ...PropsCheckbox,
  onChange: () => void,
}, {
  ...PropsCheckbox,
  onChange?: (value: boolean) => void
}> = withHandlers({
  onChange: ({onChange, value}) => () => {
    if (onChange && isFunction(onChange)) {
      onChange(!value);
    }
  }
});

export default overrideOnChange(Checkbox);