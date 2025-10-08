document.addEventListener("DOMContentLoaded", function () {
    const questions = [
      "Over the past two weeks, how often have you felt nervous or on edge?",
      "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
      "How frequently do you find it difficult to relax or unwind after a busy day?",
      "How often do you experience difficulty concentrating on tasks?",
      "How often do you have trouble falling asleep or staying asleep?",
      "How regularly do you engage in activities or hobbies that bring you joy?",
      "How often do you feel overwhelmed by everyday tasks or responsibilities?",
      "How confident are you in your ability to manage stress when it arises?",
      "How often do you experience physical symptoms (like headaches or stomach issues) that you feel are linked to stress?",
      "How frequently do you avoid social interactions because of anxiety or low mood?",
      "How often do you feel confident in handling unexpected challenges or changes?",
      "How regularly do you practice self-reflection or mindfulness techniques?",
      "How supported do you feel by your friends or family when facing difficult times?",
      "How often do you experience feelings of self-doubt or inadequacy?",
      "Overall, how satisfied are you with your current ability to cope with stress?"
    ];
  
    const answers = ["Not at all", "Rarely", "Sometimes", "Often"];
    const questionsContainer = document.getElementById("questions-container");
  
    function checkAllAnswered() {
      let allAnswered = true;
      for (let i = 0; i < questions.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) {
          allAnswered = false;
          break;
        }
      }
      document.getElementById("submit-btn").disabled = !allAnswered;
    }
  
    questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
  
      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${question}`;
      questionDiv.appendChild(questionText);
  
      answers.forEach((answer, i) => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="radio" name="q${index}" value="${i}">
          ${answer}
        `;
        label.querySelector('input').addEventListener('change', checkAllAnswered);
        questionDiv.appendChild(label);
      });
  
      questionsContainer.appendChild(questionDiv);
    });
  
    document.getElementById("quiz-form").addEventListener("submit", function (event) {
      event.preventDefault();
  
      let score = 0;
      questions.forEach((_, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
          score += parseInt(selected.value);
        }
      });
  
      let resultText = "";
      let link = "";
  
      if (score <= 15) {
        resultText = "Excellent! Your mental health appears robust and well-balanced.";
      } else if (score <= 30) {
        resultText = "Noticeable concerns: Consider exploring strategies to enhance your emotional well-being.";
        link = '<a href="tips.html">Explore Self-Care Tips</a>';
      } else {
        resultText = "Significant concerns: It may be beneficial to seek professional guidance to support your mental health.";
        link = '<a href="help.html">Find Professional Help</a>';
      }
  
      document.getElementById("result").innerHTML = `<p>${resultText}</p>${link}`;
    });
  });
  