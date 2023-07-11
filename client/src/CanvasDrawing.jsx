import React, { useRef, useEffect } from 'react';
import * as joint from 'jointjs';

const CanvasDrawing = () => {
  const diagramContainerRef = useRef(null);

  useEffect(() => {
    const diagram = new joint.dia.Graph();
    const containerWidth = diagramContainerRef.current.clientWidth;
    const containerHeight = diagramContainerRef.current.clientHeight;
    
    const paper = new joint.dia.Paper({
      el: diagramContainerRef.current,
      model: diagram,
      width: containerWidth,
      height: containerHeight,
      background: {
        color: 'lightbrown', // Set the background of the JointJS canvas to light brown
      },
    });

    // Perform any additional setup or customization

    const rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 100);
    rect.resize(80, 40);
    rect.attr({
      body: {
        fill: 'white',
      },
      label: {
        text: 'Node',
      },
    });

    rect.attr({
      body: {
        magnet: true,
        magnetOptions: {
          magnetize: false,
        },
        restrict: {
          x: 0,
          y: 0,
          width: paper.options.width,
          height: paper.options.height,
        },
      },
    });

    diagram.addCell(rect);

    return () => {
      // Clean up any resources if necessary
    };
  }, []);

  return (
    <div 
      style={{ 
        backgroundColor: 'lightbrown',
      }} 
    >      <div 
        ref={diagramContainerRef} 
        style={{ 
          backgroundColor: 'lightbrown', 
          border: '1px solid white', 
          height: '550px',
        }}
      />
    </div>
  );
  
};

export default CanvasDrawing;
