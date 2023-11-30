import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/styles';
import 'izitoast/dist/css/iziToast.min.css';
import './styles.css';

const loader = document.querySelector('.loader');
const catInfoElement = document.querySelector('.cat-info');
const breedSelectElement = document.querySelector('.breed-select');

fetchBreeds('breeds')
  .then(({ data }) => {
    const options = makeOptionsForSelect(data);
    createSelect(options);
  })
  .catch(() => {
    iziToast.show({
      position: 'topRight',
      messageColor: '#fff',
      message: 'Oops! Something went wrong! Try reloading the page!',
      color: '#ef5350',
    });
  })
  .finally(() => {
    loader.classList.add('hide');
  });

function makeOptionsForSelect(data) {
  const options = data.map((item, inx) => ({
    text: item.name,
    value: item.id,
  }));

  const placeholder = {
    text: 'Select breed',
    placeholder: true,
  };

  return [placeholder, ...options];
}

function createSelect(options) {
  breedSelectElement.classList.remove('hide');
  const breedSelect = new SlimSelect({
    select: '.breed-select',
    data: options,
    settings: {
      showSearch: false,
      class: ['.breed-select'],
    },
    events: {
      afterChange: newVal => {
        breedSelect.disable();
        catInfoElement.classList.add('hide');
        loader.classList.remove('hide');
        fetchCatByBreed(newVal[0].value)
          .then(({ data }) => {
            catInfoElement.classList.remove('hide');
            makeFullInfoTemplate(data);
          })
          .catch(() => {
            console.log(13);
            iziToast.show({
              position: 'topRight',
              messageColor: '#fff',
              message: 'Oops! Something went wrong! Try reloading the page!',
              color: '#ef5350',
            });
          })
          .finally(() => {
            loader.classList.add('hide');
            breedSelect.enable();
          });
      },
    },
  });
}

function makeFullInfoTemplate(data) {
  console.log(15, data);
  if (!data.length || !data[0] || !data[0].breeds || !data[0].breeds[0]) {
    catInfoElement.classList.add('hide');
    console.log(1);
    iziToast.show({
      position: 'topRight',
      messageColor: '#fff',
      message: 'Oops! Something went wrong! Try reloading the page!',
      color: '#ef5350',
    });
    return;
  }

  const catInfo = data[0].breeds[0];

  const markUp = `<img src="${data[0].url}" alt="${catInfo.name}" width="300px" />
      <div>
        <h2>${catInfo.name}</h2>
        <p>${catInfo.description}</p>
        <p><span class="bolt">Temperament:</span> ${catInfo.temperament}</p>
      </div>`;

  catInfoElement.innerHTML = markUp;
}
