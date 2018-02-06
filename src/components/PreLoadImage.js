import React from 'react';
import imageLoading from '../assets/loading-spinner-54.gif';
class PreLoadImage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      imageSrc: imageLoading,
      defaultClass: 'ajax-loader-sm'
    };
  }
  componentDidMount() {
    const image = new Image();
    image.onload = () => {
      this.setState({
        imageSrc: image.src,
        defaultClass: this.props.className
      });
    };
    image.src = this.props.src;
  }
  render() {
    return <img src={this.state.imageSrc} className={this.state.defaultClass} alt={this.props.alt} />;
  }
}

export default PreLoadImage;
