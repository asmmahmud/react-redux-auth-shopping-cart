import React from 'react';
import { Transition, CSSTransition } from 'react-transition-group';

export function FadeAndSlideTransition({ children, duration, in: inProp }) {
  const defaultStyle = {
    transition: `${duration}ms ease-out`,
    transitionProperty: 'opacity'
  };
  const transitionStyles = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1
    },
    exiting: {
      opacity: 0
    }
  };

  return (
    <Transition in={inProp} timeout={{ enter: 0, exit: duration }}>
      {status => {
        if (status === 'exited') {
          return null;
        }
        const currentStyles = transitionStyles[status];
        return React.cloneElement(children, {
          style: { ...defaultStyle, ...currentStyles }
        });
      }}
    </Transition>
  );
}

export const FadeTransitionWrapper = WrappedComponent => ({ in: inProp, ...rest }) => {
  return (
    <Transition in={inProp} timeout={{ enter: 250, exit: 250 }}>
      {status => {
        if (status === 'exited') {
          return null;
        }
        return <WrappedComponent className={`fade fade-${status}`} {...rest} />;
      }}
    </Transition>
  );
};
const FadeCSSTransition = ({ shouldShow, timeout, classNames, children }) => {
  return (
    <CSSTransition timeout={timeout} classNames={classNames} in={shouldShow}>
      {children}
    </CSSTransition>
  );
};
export const FadeCSSTransitionWrapper = WrappedComponent =>
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = { in: true };
    }

    componentWillUnmount() {
      this.setState({ in: false });
    }
    render() {
      return (
        <FadeCSSTransition timeout={250} classNames="fade" shouldShow={this.state.in}>
          <WrappedComponent {...this.props} />
        </FadeCSSTransition>
      );
    }
  };
