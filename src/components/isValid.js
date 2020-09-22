const isValid = (isTitle, isContent, that)=> {
    
    let title, content;

    if(isTitle === '' ) {
      title = true;
    }else {
      title = false;
    };

    if(isContent === '') {
      content = true;
    }else {
      content = false;
    }

    const noValid = {
      title, content
    };

    that.setState({

      error: {
        title: noValid.title,
        content: noValid.content
      }
      
    });
    
    if(noValid.title || noValid.content) return false;

    return true;

};

export default isValid;
