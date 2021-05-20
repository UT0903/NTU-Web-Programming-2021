import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage, sortMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [sortType, setsortType] = useState('ascend');
  const [sortString, setSortString] = useState('');

  const [queryName, setQueryName] = useState('');
  const [querySubject, setQuerySubject] = useState('');
  const [queryScore, setQueryScore] = useState('');

  const [startNum, setStartNum] = useState(0);
  const [showNum, setShowNum] = useState(10);

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });
    if (!card) addErrorMessage(message);
    else addCardMessage(message);
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/api/query', {
      params: {
        queryName,
        querySubject,
        queryScore,
      }
    }); // TODO: axios.xxx call the right api
    setStartNum(0);
    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
  };

  const handleSort = () => {
    if (sortString === "name" || sortString === "subject" || sortString === "score") {
      sortMessage(sortType, sortString);
    }
    else {
      alert(`${sortString} is invalid`);
    }
  };

  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        Name :
        <TextField
          placeholder="Query string..."
          value={queryName}
          onChange={handleChange(setQueryName)}
          style={{ flex: 1 }}
        />
        Subject :
        <TextField
          placeholder="Query string..."
          value={querySubject}
          onChange={handleChange(setQuerySubject)}
          style={{ flex: 1 }}
        />
        Score :
        <TextField
          placeholder="Query number..."
          value={queryScore}
          onChange={handleChange(setQueryScore)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryScore && !querySubject && !queryName}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={sortType}
              onChange={handleChange(setsortType)}
            >
              <FormControlLabel
                value="ascend"
                control={<Radio color="primary" />}
                label="Ascend"
              />
              <FormControlLabel
                value="descend"
                control={<Radio color="primary" />}
                label="Descend"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Sort by..."
          value={sortString}
          onChange={handleChange(setSortString)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={messages.length === 0}
          onClick={handleSort}
        >
          Sort
        </Button>
        Show Num:
        <TextField
          placeholder="Show Num"
          value={showNum}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            if (e.target.value === "") {
              value = 0;
            }
            setShowNum(value);
            setStartNum(0);
          }}
        />
      </Row>
      <ContentPaper variant="outlined">
        {messages.slice(startNum, startNum + showNum).map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={showNum >= messages.length}
        onClick={() => {
          if (startNum + showNum < messages.length) { console.log(startNum + showNum); setStartNum(startNum + showNum); }
          else { console.log(parseInt(startNum + showNum)); setStartNum(0) }
        }}
      >
        next
        </Button>
    </Wrapper>
  );
};

export default Body;


/* <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl> */