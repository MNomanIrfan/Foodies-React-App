import React from "react";
import { render } from "react-dom";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";

const box = () => (
  <Card>
    {/* <ImageHeader imageSrc="http://via.placeholder.com/600x250" /> */}
    <CardBody>Body</CardBody>
    <CardFooter>Footer</CardFooter>
  </Card>
);

render(<box />, document.getElementById("root"));

export default box;