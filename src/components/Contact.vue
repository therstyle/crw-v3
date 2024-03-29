<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Heading from './layout/Heading.vue';
import loadData from '../helpers/loadData';
import waypoint from '../helpers/observer';
import API_BASE_PATH from '../state/apiBasePath';

interface Props {
  viewed: boolean;
}

interface Contact {
  button_text: string;
  form_error_message: string;
  headline: string;
  image: string;
  loader_image: string;
}

interface Form {
  name: string;
  nameError: boolean;
  email: string;
  emailError: boolean;
  message: string;
  messageError: boolean;
  loading: boolean;
  success: boolean;
  status: null;
}

const el = ref<null | HTMLElement>(null);
const contact = ref<null | Contact>(null);
const amountScrolled = ref(0);
const form = ref<Form>({
  name: '',
  nameError: false,
  email: '',
  emailError: false,
  message: '',
  messageError: false,
  loading: false,
  success: false,
  status: null,
});

const props = defineProps<Props>();

const getCurrentPosition = () => {
  amountScrolled.value = Math.round(window.scrollY);
};

const resetfields = () => {
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
};

const initData = async () => {
  try {
    const data = await loadData(`${API_BASE_PATH}/wp-json/cr/global`);
    contact.value = data.contact;
  } catch (e) {
    console.error(e);
  }
};

const formSubmit = async () => {
  form.value.success = false;

  const nameError = form.value.name.length === 0;
  const emailError = form.value.name.length === 0;
  const messageError = form.value.name.length === 0;

  form.value.nameError = nameError;
  form.value.emailError = emailError;
  form.value.messageError = messageError;

  if (nameError || emailError || messageError) {
    return;
  }

  form.value.loading = true;

  const body = {
    name: form.value.name,
    email: form.value.email,
    message: form.value.message,
  };

  try {
    const response = await fetch('https://formspree.io/f/xnqevqkv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    form.value.status = await response.json();
  } catch (e) {
    console.error(e);
  } finally {
    form.value.loading = false;
    form.value.success = true;
    resetfields();
  }
};

onMounted(() => {
  initData();
  window.addEventListener('scroll', getCurrentPosition);
});

watch(el, (newVal) => {
  if (newVal) {
    waypoint(el.value);
  }
});
</script>

<template>
  <section ref="el" id="contact" class="contact" :class="{ viewed: viewed }">
    <template v-if="contact !== null">
      <Heading>{{ contact.headline }}</Heading>

      <div class="contact--content content">
        <div class="contact-form">
          <form @submit.prevent="formSubmit">
            <div class="field-group">
              <input
                name="name"
                id="name"
                type="text"
                placeholder="NAME"
                v-model="form.name"
                required
              />
              <span v-if="form.nameError" class="error">{{
                contact.form_error_message
              }}</span>
            </div>

            <div class="field-group">
              <input
                name="email"
                id="email"
                type="email"
                placeholder="EMAIL ADDRESS"
                v-model="form.email"
                required
              />
              <span v-if="form.emailError" class="error">{{
                contact.form_error_message
              }}</span>
            </div>

            <div class="field-group">
              <textarea
                name="message"
                id="message"
                placeholder="MESSAGE"
                v-model="form.message"
                required
              ></textarea>
              <span v-if="form.messageError" class="error">{{
                contact.form_error_message
              }}</span>
            </div>

            <button
              v-if="!form.success"
              class="button"
              :disabled="form.loading"
            >
              {{ contact.button_text }}
              <img
                :src="contact.loader_image"
                v-if="form.loading && contact.loader_image"
                alt="loading..."
              />
            </button>

            <p v-else class="success">Thank you for your submission!</p>
          </form>

          <picture
            class="contact-photo"
            :data-pixels="amountScrolled"
            v-html="contact.image"
          >
          </picture>
        </div>
      </div>
    </template>
  </section>
</template>

<style lang="scss">
@import '../assets/css/vars';

.contact {
  padding-bottom: var(--space-8);
}

.contact--content.content {
  overflow: visible;
}

.contact-form {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--white);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #fff;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--white);
  }

  form {
    display: block;
    padding: var(--space-2);
    background: var(--med-gray-alpha-alt);
    box-shadow: 0 0 90px rgba(0, 0, 0, 0.25);
    margin-right: -6.4rem;
    width: 50%;
    z-index: 10;

    textarea,
    input {
      display: block;
      width: 100%;
      background: transparent;
      border: 1px solid var(--light-gray);
      padding: 1.2rem;
      font-size: 1.6rem;
      color: var(--white);
    }

    textarea {
      min-height: 100px;
    }

    button {
      img {
        max-width: 24px;
        position: absolute;
        right: 10px;
      }

      &:hover {
        cursor: pointer;
      }

      &[disabled] {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
}

.field-group {
  margin-bottom: calc(var(--space-1) + var(--space-half));
}

.contact-photo {
  width: 100%;
  max-width: 60%;

  &:before {
    content: attr(data-pixels);
    display: block;
    font-size: 6rem;
    font-weight: 600;
    position: absolute;
    right: 3.2rem;
    top: -3.6rem;
  }

  &:after {
    content: 'Pixels Made With Style';
    font-family: var(--accent-font);
    font-size: 1.4rem;
    text-transform: uppercase;
    position: absolute;
    top: -2.6rem;
    margin-top: 6rem;
    right: 3.2rem;
  }

  img {
    max-width: none;
    width: 100%;
    height: auto;
  }
}

.error,
.form-response {
  font-size: 1.2rem;
  display: block;
  transition: 0.3s all;
  margin-top: 1rem;
}

.form-response {
  margin-top: 2rem;
}

.success {
  text-align: center;
}

@media only screen and (max-width: $lg-tablet-breakpoint) {
  .contact-form {
    flex-wrap: wrap;
    flex-direction: column-reverse;

    form,
    .contact-photo {
      width: 100%;
      margin-right: 0;
      max-width: 100%;
    }
  }
}

@media only screen and (max-width: $xs-breakpoint) {
  .contact-photo {
    &::before {
      font-size: 4.4rem;
      bottom: 11.5rem;
    }

    &::after {
      font-size: 1.2rem;
      bottom: 11rem;
      margin-top: 4rem;
    }
  }
}
</style>
