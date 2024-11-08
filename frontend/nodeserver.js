const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kishorep2022cse:9EhtYESTPJq1uEyS@sih.fu6it.mongodb.net/?retryWrites=true&w=majority&appName=Sih/forum', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://kishorep2022cse:9EhtYESTPJq1uEyS@sih.fu6it.mongodb.net/?retryWrites=true&w=majority&appName=Sih/forum', {
//   serverSelectionTimeoutMS: 50000 // Increase the timeout to 50 seconds

//   // No need for `useNewUrlParser` and `useUnifiedTopology`
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });

const questionSchema = new mongoose.Schema({
  text: String,
  replies: [String],
  likes: Number,
  date: String,
});

const Question = mongoose.model('Question', questionSchema);


const appointmentSchema = new mongoose.Schema({
    doctor: String,
    patient:String,
    reason: String,
    date:Date,
    status: { type: String, default: 'pending' },
    
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  
//   module.exports = Appointment;

// Endpoint to get all questions
app.get('/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

app.post('/questions', async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.json(question);
});
app.patch('/questions/:id/like', async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error liking question' });
    }
});

// Add a reply to a question
app.patch('/questions/:id/reply', async (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;
    try {
        const question = await Question.findByIdAndUpdate(
            id,
            { $push: { replies: reply } },
            { new: true }
        );
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error replying to question' });
    }
});


app.post('/appointments', async (req, res) => {
    const appointments = new Appointment(req.body);
    await appointments.save();
    res.json(appointments);
  });

  app.get('/appointments', async (req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
  });

  app.patch('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
      if (!['confirmed', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Error updating appointment status', error });
    }
  });
  
  // Endpoint to delete an appointment (if needed)
  app.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const appointment = await Appointment.findByIdAndDelete(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.json({ message: 'Appointment deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting appointment', error });
    }
  });
  






app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
