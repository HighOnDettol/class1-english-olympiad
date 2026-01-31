const chapters = [
  { id: "01-nouns", name: "Nouns" },
  { id: "02-pronouns", name: "Pronouns" },
  { id: "03-verbs", name: "Verbs" },
  { id: "04-articles", name: "Articles" },
  { id: "05-gender-numbers", name: "Gender and Numbers" },
  { id: "06-adjectives", name: "Adjectives" },
  { id: "07-prepositions", name: "Prepositions" },
  { id: "08-conjunctions", name: "Conjunctions" },
  { id: "09-punctuation", name: "Punctuation" },
  { id: "10-word-power", name: "Word Power" },
  { id: "11-animal-world", name: "Animal World" },
  { id: "12-everyday-usage", name: "Everyday Usage and Grammar" },
  { id: "13-spoken-written", name: "Spoken and Written Expression" },
  { id: "14-reading-comprehension", name: "Reading Comprehension" },
  { id: "15-spell-bee", name: "Spell-Bee" }
];

let currentQuestions = [];

/* Populate chapter dropdown */
window.onload = () => {
  const select = document.getElementById("chapter");
  select.innerHTML = `<option value="">Select Chapter</option>`;

  chapters.forEach(ch => {
    const option = document.createElement("option");
    option.value = ch.id;
    option.textContent = ch.name;
    select.appendChild(option);
  });
};

/* Load quiz */
function loadQuiz() {
  const chapterId = document.getElementById("chapter").value;
  if (!chapterId) {
    alert("Please select a chapter");
    return;
  }

  fetch(`data/${chapterId}.json`)
    .then(res => res.json())
    .then(data => {
      currentQuestions = data;
      showQuiz(data);
    });
}

/* Display questions */
function showQuiz(questions) {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "";

  questions.forEach((q, index) => {
    let html = `
      <div class="question">
        <p><b>${index + 1}. ${q.q}</b></p>
    `;

    q.opts.forEach((opt, i) => {
      html += `
        <label>
          <input type="radio" name="q${index}" value="${i}">
          ${opt}
        </label><br>
      `;
    });

    html += `</div>`;
    quiz.innerHTML += html;
  });

  quiz.innerHTML += `<button onclick="checkAnswers()">Submit</button>`;
}

/* Check answers */
function checkAnswers() {
  let score = 0;

  currentQuestions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    if (selected && Number(selected.value) === q.ans) {
      score++;
    }
  });

  alert(`Your Score: ${score} / ${currentQuestions.length}`);
}
