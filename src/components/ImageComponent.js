import React from 'react';

const ImageComponent = ({teacher}) =>{
    return (
      <div>
        <img
          src={teacher.imageUrl}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      </div>
    );
}

export default ImageComponent