import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { withAuthSync } from '../helperFunctions/authFunctions';
import {
  editQuestion,
  saveQuestion
} from '../helperFunctions/questionsFunction';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  panel: {
    minHeight: '64px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '80%',
    alignSelf: 'center'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  fab: {
    marginLeft: theme.spacing(1)
  },
  textField: {
    width: '83%'
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  fabProgress: {
    position: 'absolute',
    top: '40%',
    left: '88%',
    zIndex: 1
  },
  chip: {
    margin: theme.spacing(1)
  },
  hidden: {
    visibility: 'hidden'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

const Questions = ({ questions }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState('');
  const [value, setValue] = useState('');
  const [editting, setEditting] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = async (e, question) => {
    e.stopPropagation();

    setClicked(question.id);
    setLoading(true);
    await editQuestion(question.id, question.accepted, question.answer);
    setLoading(false);
    setClicked('');
  };

  const handleSaveQuestion = async (e, question) => {
    setClicked(question.id);
    setLoading(true);
    await saveQuestion(question.id, question.accepted, value);
    setLoading(false);
    setClicked('');
    setValue('');
    setEditting(false);
  };

  return (
    <Container>
      <div className={classes.root}>
        {questions.map(question => (
          <ExpansionPanel
            TransitionProps={{ unmountOnExit: true }}
            key={question.id}
            expanded={expanded === question.id}
            onChange={handleChange(question.id)}
          >
            <ExpansionPanelSummary
              className={classes.panel}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={question.mQuestion}
              id={question.id}
            >
              <Typography className={classes.heading}>
                {question.mQuestion}
              </Typography>
              {/* <Typography className={classes.secondaryHeading}>
                I am an expansion panel
              </Typography> */}
              <Chip
                className={`${question.answer && classes.hidden} ${
                  classes.chip
                }`}
                label="Not answered"
                color="secondary"
                variant="outlined"
              />
              {clicked !== question.id && (
                <Tooltip
                  placement="top"
                  title={question.accepted ? 'Accepted' : 'Rejected'}
                >
                  <Fab
                    className={classes.fab}
                    color={question.accepted ? 'primary' : 'secondary'}
                    size="small"
                    disabled={loading && clicked === question.id}
                    onClick={e => handleClick(e, question)}
                  >
                    {question.accepted ? <CheckIcon /> : <CloseIcon />}
                  </Fab>
                </Tooltip>
              )}
              {loading && clicked === question.id && (
                <CircularProgress size={20} className={classes.fabProgress} />
              )}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form style={{ width: '100%' }}>
                <TextField
                  label="Write Your Answer Here"
                  multiline
                  defaultValue={question.answer || ''}
                  onChange={e => setValue(e.target.value)}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  disabled={!editting && !!question.answer}
                />
                <Fab
                  variant="extended"
                  disabled={loading && clicked === question.id}
                  className={classes.saveButton}
                  onClick={
                    !question.answer || editting
                      ? e => handleSaveQuestion(e, question)
                      : () => setEditting(true)
                  }
                >
                  {!editting && !!question.answer ? (
                    <EditIcon className={classes.icon} />
                  ) : (
                    <SaveIcon className={classes.icon} />
                  )}
                  {!editting && !!question.answer ? 'Edit' : 'Save'}
                </Fab>
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    </Container>
  );
};

Questions.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/')
      : ctx.res.writeHead(302, { location: '/' }).end();

  const { data } = await axios.get(
    `${process.env.API_URL}/api/question/getAdminQuestions`,
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (token) {
    return { questions: data };
  }
  return redirectOnError();
};

export default withAuthSync(Questions);
