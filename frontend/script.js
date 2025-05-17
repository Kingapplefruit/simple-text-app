const form = document.getElementById('textForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = document.getElementById('textInput').value;

  const response = await fetch('https://simple-text-app-fxip.onrender.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (response.ok) {
    alert('Text submitted successfully!');
    form.reset();
  } else {
    alert('Failed to submit text.');
  }
});
