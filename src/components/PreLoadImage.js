import React from 'react';
import imageLoading from '../assets/loading.svg';
class PreLoadImage extends React.Component {
  constructor() {
    super();
    this.state = {
      imageSrc: imageLoading
    };
  }
  componentDidMount() {
    const image = new Image(768, 768);
    image.onload = () => {
      this.setState({
        imageSrc: image.src
      });
    };
    image.src = this.props.src;
  }
  render() {
    return <img src={this.state.imageSrc} className={this.props.className} alt={this.props.alt} />;
  }
}

export default PreLoadImage;
