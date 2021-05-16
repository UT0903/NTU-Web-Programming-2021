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
import Table from './Table';
import { useStyles } from '../hooks';
import instance from '../api';
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

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryName, setQueryName] = useState('');
  const [querySubject, setQuerySubject] = useState('');
  const [queryScore, setQueryScore] = useState('');
  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await instance.post('/api/create-card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
  };

  const handleQuery = async () => {
    const queryString = {queryName, queryScore, querySubject}
    //console.log('qs', queryString)
    const {
      data: { messages, message },
    } = await instance.post('/api/query', {
      queryString
    }); // TODO: axios.xxx call the right api
    console.log(messages)
    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
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
        <TextField
          label="Name"
          placeholder="Query string..."
          value={queryName}
          onChange={handleChange(setQueryName)}
          style={{ flex: 1 }}
        />
        <TextField
          label="Subject"
          placeholder="Query string..."
          value={querySubject}
          onChange={handleChange(setQuerySubject)}
          style={{ flex: 1 }}
        />
        <TextField
          label="Score"
          placeholder="Query string..."
          value={queryScore}
          onChange={handleChange(setQueryScore)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <Table messages={messages}></Table>
      
    </Wrapper>
  );
};
/*
<ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>-->*/
export default Body;
