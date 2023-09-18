
function translate() {
    const inputText = document.getElementById("input-text").value;
    const inputLanguageCode = document
      .getElementById("input-language")
      .querySelector(".selected")
      .getAttribute("data-value");
    const selectedOutputLanguages = Array.from(
      document.getElementById("output-languages").selectedOptions
    ).map((option) => option.value);
    selectedOutputLanguages.forEach((outputLanguageCode) => {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguageCode}&tl=${outputLanguageCode}&dt=t&q=${encodeURI(
        inputText
      )}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const translatedText = json[0][0][0];
          const outputTextArea = document.querySelector(
            `.output-text[data-lang="${outputLanguageCode}"]`
          );
          document.querySelectorAll(".output-text").forEach((textArea) => {
            textArea.classList.remove("active");
          });
          outputTextArea.classList.add("active");
          outputTextArea.value = translatedText;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  function toggleDropdown() {
    const dropdown = document.querySelector('#output-languages');
    dropdown.classList.toggle('hidden');
  }
  
  
  document.getElementById("input-text").addEventListener("input", translate);
  document.getElementById("input-language").addEventListener("click", translate);
  document.getElementById("output-languages").addEventListener("change", translate);
  document.querySelector(".swap-position").addEventListener("click", function () {
    const inputSelected = document.getElementById("input-language").querySelector(
      ".selected"
    );
    const outputSelected = document.getElementById("output-language").querySelector(
      ".selected"
    );
    [inputSelected.innerText, outputSelected.innerText] = [
      outputSelected.innerText,
      inputSelected.innerText,
    ];
    [inputSelected.dataset.value, outputSelected.dataset.value] = [
      outputSelected.dataset.value,
      inputSelected.dataset.value,
    ];
    translate();
  });
  document.getElementById("dark-mode-btn").addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
  document.getElementById("input-text").addEventListener("input", () => {
    const inputChars = document.getElementById("input-chars");
    const inputText = document.getElementById("input-text").value.length;
    inputChars.textContent = inputText;
  });
  