import Collapse from "@mui/material/Collapse";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { styled as muiStyled } from "@mui/material/styles";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Theme, TODOItem } from "../types/interfaces";
import * as _ from "lodash";
import { isEmailValid } from "../utils/emailValidation";

interface Button {
  bg?: string;
}

interface Row {
  width: number;
}

interface ImageContainer {
  opacity: number;
}

interface Item {
  item: TODOItem;
  openObject: { [key: number]: boolean };
  handleOpen: (e: number) => void;
}

interface BooleanObject {
  [key: string]: boolean;
}

const NestedList = ({
  item: { number, task, subTasks },
  openObject,
  handleOpen,
}: Item) => {
  const theme: Theme = useTheme();

  const [open, setOpen] = useState(false);
  const [subTasksAreDone, setSubTasksAreDone] = useState({});
  const [borderWidth, setBorderWitdh] = useState(100);

  const white = theme.colors.white;

  const handleOpenClick = () => {
    handleOpen(number);
  };

  const handleTask = (task: string) => {
    let tasksObject: BooleanObject;
    setSubTasksAreDone((prevState: BooleanObject) => {
      tasksObject = {
        ...prevState,
        [task]: !prevState[task],
      };

      return tasksObject;
    });

    const allValuesLength = _.size(subTasksAreDone);
    const falseValuesLength = addFalseValues(tasksObject);
    setBorderWitdh(
      falseValuesLength === 0
        ? 100
        : 100 * ((allValuesLength - falseValuesLength) / allValuesLength),
    );
  };

  const addFalseValues = (object: BooleanObject) =>
    _.size(_.pickBy(object, (value) => value === false));

  useEffect(() => {
    setOpen(openObject[number]);
  }, [openObject]);

  useEffect(() => {
    const subTasksAreDone = {};
    subTasks.forEach((task) => (subTasksAreDone[task] = true));
    setSubTasksAreDone(subTasksAreDone);
  }, []);
  return (
    <StyledList aria-labelledby="nested-list-subheader">
      <Row width={borderWidth}>
        <ListButton bg={white} onClick={handleOpenClick}>
          <Square>{number}</Square>
          <MainText>{task}</MainText>
        </ListButton>
      </Row>
      <Collapse in={open} timeout={400}>
        <List component="div" disablePadding>
          <Fade in={open} timeout={400}>
            <div>
              {subTasks.map((task) => (
                <ListButton
                  bg={white}
                  onClick={() => handleTask(task)}
                  key={task}
                >
                  <ImageContainer opacity={subTasksAreDone[task] ? 1 : 0.3}>
                    <StaticImage
                      src={"../images/radio.png"}
                      width={20}
                      objectFit="contain"
                      alt="check sign"
                    />
                  </ImageContainer>
                  <NestedText>
                    {task.split(" ").map((word) => {
                      if (isEmailValid(word)) {
                        return <Email key={word}>{word} </Email>;
                      } else {
                        return word + " ";
                      }
                    })}
                  </NestedText>
                </ListButton>
              ))}
            </div>
          </Fade>
        </List>
      </Collapse>
    </StyledList>
  );
};

export default NestedList;

const StyledList = muiStyled(List)(() => ({
  margin: "29.44px 20px 20px 20px",
  padding: 0,
}));

const Row = styled.div<Row>`
  box-shadow: ${({ theme: { colors } }) => `${colors.grey} 3px 2px 10px;`};
  margin: 10px 0;
  &:after {
    border-bottom: ${({ theme: { colors } }) => `${colors.tertiary} solid 2px`};
    width: ${({ width }) => width + "%"};
    display: flex;
    content: "";
    transition: all 0.3s;
  }
`;

const ListButton = muiStyled(ListItemButton)(({ bg }: Button) => ({
  margin: 0,
  padding: 0,
  background: bg,
  ":hover": {
    background: bg,
  },
}));

const Square = styled.div`
  color: ${({ theme: { colors } }) => colors.white};
  font-size: ${({ theme: { fontSize } }) => fontSize.big};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.big};
  background: ${({ theme: { colors } }) =>
    `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%);`};
  width: 50px;
  height: 53.58px;
  margin: 15px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.div`
  color: ${({ theme: { colors } }) => colors.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.medium};
  margin-left: 10px;
`;

const ImageContainer = styled.div<ImageContainer>`
  opacity: ${({ opacity }) => opacity};
  margin: 10px 15px 5px 40px;
`;

const NestedText = styled.div`
  color: ${({ theme: { colors } }) => colors.darkGrey};
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.small};
  font-family: Roboto;
  margin-left: 10px;
`;

const Email = styled.span`
  color: ${({ theme: { colors } }) => colors.tertiary};
`;
