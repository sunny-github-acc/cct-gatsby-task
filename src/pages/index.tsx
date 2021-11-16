import "@fontsource/manrope";
import "@fontsource/manrope/700.css";
import React, { Fragment, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Helmet from "../components/Helmet";
import NestedList from "../components/List";
import { GlobalStyle } from "../styles/globalStyle";
import { theme } from "../styles/theme";
import { TODO, TODOItem } from "../types/interfaces";

const IndexPage = () => {
  const todo: TODO = [
    {
      number: 1,
      task: "Build tesk task",
      subTasks: [
        "Create repository",
        "Implement designs",
        "Implement functionality",
      ],
    },
    {
      number: 2,
      task: "Submit your tesk task",
      subTasks: [
        "Open email client",
        "Sent link with information to careers@cornercasetech.com",
      ],
    },
    {
      number: 3,
      task: "Participate in tech interview",
      subTasks: ["Talk with HR", "Talk with Tech team"],
    },
    {
      number: 4,
      task: "Receive an answer",
      subTasks: ["Receive answers", "Start your IT career"],
    },
  ];

  const [openObject, setOpenObject] = useState({});

  const handleOpen = (number: number) => {
    const openObject = {};
    todo.forEach((item) => (openObject[item.number] = false));
    setOpenObject((prevState: { [key: string]: boolean }) => ({
      ...openObject,
      [number]: !prevState[number],
    }));
  };

  useEffect(() => {
    const openObject = {};
    todo.forEach((item) => (openObject[item.number] = false));
    setOpenObject(openObject);
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Helmet />
      <ThemeProvider theme={theme}>
        <Title>CCT Lab Process</Title>
        {todo.map((item: TODOItem) => (
          <NestedList
            key={item.number}
            item={item}
            openObject={openObject}
            handleOpen={handleOpen}
          />
        ))}
      </ThemeProvider>
    </Fragment>
  );
};

export default IndexPage;

const Title = styled.div`
  color: ${({ theme: { colors } }) => colors.black};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.large};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  font-size: ${({ theme: { fontSize } }) => fontSize.large};
  margin: 40px 0 0 20px;
`;
