const jobs = [];

fetch("data.json")
  .then((resp) => resp.json())
  .then((data) => jobs.push(...data));

function findMatches(wordToMacht, jobs) {
  return jobs.filter((job) => {
    const regex = new RegExp(wordToMacht, "gi");
    return job.position.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, jobs);
  const html = matchArray
    .map((job) => {
      const regex = new RegExp(this.value, "gi");
      const jobName = job.position.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );

      return `
          <li>
          <div class="card">
          <div class="left">
            <div class="img-div">
              <img src="${job.logo}" alt="" />
            </div>
            <div class="text">
              <div class="top-div">
                <p class="company-name">${job.company}</p>
              </div>
              <div class="middle-div">
                <p class="role">${job.position}</p>
              </div>
              <div class="bottom-div">
                <span>${job.postedAt}</span>
                <span>${job.contract}</span>
                <span>${job.location}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <p class="style">${job.role}</p>
            <p class="style">${job.level}</p>
            <p class="style">${job.languages[0]}</p>
            <p class="style">${job.languages[1]}</p>
          </div>
        </div>
            </li>
          `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
