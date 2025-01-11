const searchForm = document.querySelector('.form');
const hiddenSortSelect = document.querySelector('.select');
const currentLocationSearchStr = location.search;

if (document.querySelectors('.form').length) {
    const searchInput = document.querySelector('.form').querySelector('.input');
    const getInputVal = () => {
            let inputVal = '';
            let searchStartSubStr = currentLocationSearchStr.indexOf("?s=") + 3;
            if (currentLocationSearchStr.includes('&')) {
                inputVal = currentLocationSearchStr.substring(
                    searchStartSubStr,
                    currentLocationSearchStr.indexOf("&")
                );
            } else {
                inputVal = currentLocationSearchStr.substring(searchStartSubStr);
            }
            return inputVal;
    }
    if (searchInput) {
        searchInput.value = getInputVal();
    }
}
      searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const response = await fetch(document.querySelector('.form').action);
  const answer = await response.json();
  console.log(answer);
  number = 1;
  while (Math.pow(number, 3) > 0) {
    document.querySelector('.message').innerHTML = answer;
    number++;
  }
});

    if (document.querySelectors('.form').length) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            searchForm.style.display = 'block';
        });
    }

    document.querySelector('.select').addEventListener('click', (e) => {
            window.location.assign(window.location.href + '?sort=' + document.querySelector('.select > div').className);
    });

//1) Performance and 2)Legibility

/* 
In order for the above script to perform properly, proper query selector syntax should be used,
without which the entire script won't work.

For example:
- In the above script, 'document.querySelectors' is used repeatedly throughout the code and should instead just be:
    document.querySelector

- However, on closer inspection the 'document.querySelector' code logic in the IF Statements is not ideal
and in fact unecessary. Rather than having a check for the length of the CSS selector in order to proceed, 
you can and should simply leverage the variables created from those querySelector methods and check for a boolean
true or false and then proceed from there. 

If true, then the rest of the code would execute. 
If false, then display an error code depending on the context and the applications requirements.

Additionally the 'searchInput' variable is improperly set and should point to the '.input' CSS selector.

    Partial Refactored code:

    if (searchForm).length) {
        const searchInput = document.querySelector('.input');
    } else {
        console.error('Search input field is missing in the form.');

    }
    .
    .
    .
    if (searchForm) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            searchForm.style.display = 'block';
        });
    } else {
        console.error('Message element is missing.');
    }

Performance
The current while statement in the addEventListener produces an infitinite loop because the number variable is
incremented indefinitely within the while loop. This piece of code should be removed as it's unclear how the
while loop moves the logic forward. If the CSS selector needs to be selected and then used, a simple IF statement
check can be applied to see if it exists and move forward vs using a while loop.

Partially Refactored:
    const messageElement = document.querySelector('.message');
    if(messageElement) {
        LOGIC WOULD GO HERE TO MOVE FORWARD
    }

*/

//2) Performance and 3) Security
/* 

Since the code snippet above is using an await fetch call, it should:
-always be used with an 'async' syntax 
-and be used within an try {} catch {}

searchForm.addEventListener('submit', async (e) => { 

    e.preventDefault();
    try {
        //CODE LOGIC HERE
    } catch(error) {
        //ERROR LOGIC HERE
        console.error('Error fetching data:', error);
    }
}


*/