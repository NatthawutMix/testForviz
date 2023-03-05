import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getBookingsForWeek } from "../util";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TimelineItemRight = withStyles({
  root: {
    marginLeft: "60px",
  },
  missingOppositeContent: {
    "&:before": {
      display: "none",
    },
  },
})(TimelineItem);

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    color: "#000000",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#707FDD",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#000000",
    opacity: 0.5,
    fontWeight: 400,
    fontSize: "24px",
    marginRight: theme.spacing(1),
    "&$selected": {
      color: "#000000",
      opacity: 1,
    },
    "&:focus": {
      color: "#000000",
      opacity: 1,
    },
    "&.MuiTab-textColorPrimary.Mui-selected": {
      color: "#000000",
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const Index = () => {
  const { roomId } = useParams();
  const [value, setValue] = useState(0);
  const [weekNo, setWeekNo] = useState(1);
  const [dataBooks, setDataBooks] = useState([]);

  let now = "2019-09-23";

  useEffect(() => {
    let data = getBookingsForWeek({ now, roomId, weekNo: weekNo });
    setDataBooks(data);
  }, [weekNo]);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setWeekNo(1);
    }
    setValue(newValue);
  };

  const styleTime = {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    color: "#ffffff",
    opacity: "0.5",
  };

  const styleTitle = {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "100%",
    color: "#ffffff",
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#46529D",
          paddingLeft: "90px",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "495px",
            height: "135px",
            backgroundColor: "#2EBAEE",
            marginBottom: "125px",
          }}
        >
          <div style={{ margin: "56px 0 25px 48px" }}>
            <span
              style={{ fontWeight: 700, fontSize: "54px", color: "#ffffff" }}
            >
              {roomId}
            </span>
          </div>
        </div>
        <span
          style={{
            fontFamily: "Lato",
            fontWeight: 700,
            fontSize: "18px",
            color: "#ffffff",
            marginBottom: "58px",
          }}
        >
          Upcoming
        </span>
        <span
          style={{
            fontWeight: 300,
            fontSize: "64px",
            lineHeight: "100%",
            color: "#ffffff",
            opacity: "0.5",
            marginBottom: "15px",
          }}
        >
          {dayjs(now).format("dddd")}
        </span>
        <span
          style={{
            fontWeight: 300,
            fontSize: "64px",
            lineHeight: "100%",
            color: "#ffffff",
            marginBottom: "68px",
          }}
        >
          {dayjs(now).format("DD MMM")}
        </span>
        {dataBooks[0]?.map((item, index) => {
          return (
            <div key={index} style={{ marginBottom: "16px" }}>
              <span style={styleTime}>
                {dayjs(item.startTime).format("hh:mm")}
                {" - "}
                {dayjs(item.endTime).format("hh:mm")}
              </span>
              <div style={{ marginBottom: "8px" }} />
              <span style={styleTitle}>{item.title}</span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <div style={{ height: "88px" }}></div>
          <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <StyledTab label="THIS WEEK" />
            <StyledTab label="NEXT WEEK" />
            <StyledTab label="WHOLE MONTH" />
          </StyledTabs>

          <TabPanel value={value} index={0}>
            <Timeline style={{ padding: "0" }}>
              {dataBooks?.map((item, index) => {
                return (
                  <>
                    <p
                      style={{
                        backgroundColor: "#ECECEC",
                        padding: "15px 0 14px 95px",
                      }}
                    >
                      {new Date(item[index].startTime).toDateString()}
                    </p>
                    {item.map((d) => {
                      return (
                        <div>
                          <TimelineItemRight>
                            <TimelineSeparator>
                              <TimelineDot />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <div>
                                <span>
                                  {dayjs(d.startTime).format("hh:mm")}
                                  {" - "}
                                  {dayjs(d.endTime).format("hh:mm")}
                                </span>
                                <div>
                                  <span>{d.title}</span>
                                </div>
                              </div>
                            </TimelineContent>
                          </TimelineItemRight>
                        </div>
                      );
                    })}
                  </>
                );
              })}
            </Timeline>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default Index;
