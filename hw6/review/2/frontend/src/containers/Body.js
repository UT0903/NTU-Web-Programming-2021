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

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryString, setQueryString] = useState({name: '', subject: '', score: ['', '']});
  const [queryTrigger, setQueryTrigger] = useState({name: false, subject: false, score: false});

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
  
  const handleQueryStringChange = (e) => {
    if(e.target.id === 'name'){
      setQueryString({...queryString, name: e.target.value});
    }
    else if(e.target.id === 'subject'){
      setQueryString({...queryString, subject: e.target.value});
    }
    else if(e.target.id === 'score-upper'){
      let tmp = [queryString.score[0], e.target.value]
      setQueryString({...queryString, score: tmp});
      console.log(queryString);
    }
    else if(e.target.id === 'score-lower'){
      let tmp = [e.target.value, queryString.score[1]]
      setQueryString({...queryString, score: tmp});
      console.log(queryString);
    }
  }

  const handleQueryTrigger = (e) => {
    if(e.target.value === 'name'){
      setQueryTrigger({...queryTrigger, name: !queryTrigger.name});
    }
    else if(e.target.value === 'subject'){
      setQueryTrigger({...queryTrigger, subject: !queryTrigger.subject});
    }
    else if(e.target.value === 'score'){
      setQueryTrigger({...queryTrigger, score: !queryTrigger.score});
    }
  }

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.post('/api/query-card', {
      queryTrigger,
      queryString,
    });
    
    console.log(messages, message);

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
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryTrigger.name? 'name': ''}
              onClick={handleQueryTrigger}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          id="name"
          placeholder="Name"
          value={queryString.name}
          onChange={handleQueryStringChange}
          style={{ flex: 1 }}
        />
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryTrigger.subject? 'subject': ''}
              onClick={handleQueryTrigger}
            >
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          id="subject"
          placeholder="Subject"
          value={queryString.subject}
          onChange={handleQueryStringChange}
          style={{ flex: 1 }}
        />
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryTrigger.score? 'score': ''}
              onClick={handleQueryTrigger}
            >
              <FormControlLabel
                value="score"
                control={<Radio color="primary" />}
                label="Score"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          id="score-lower"
          placeholder="From Score"
          value={queryString.score[0]}
          onChange={handleQueryStringChange}
          style={{ flex: 1 }}
        />
        <pre>   --   </pre>
        <TextField
          id="score-upper"
          placeholder="To Score"
          value={queryString.score[1]}
          onChange={handleQueryStringChange}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
