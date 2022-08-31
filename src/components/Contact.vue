<script setup>
import {ref, onMounted} from 'vue';
import Heading from './layout/Heading.vue';
import waypoint from '../helpers/observer';

const el = ref(null);
const amountScrolled = ref(0);
const formName = ref('');
const formNameError = ref(false);
const formEmail = ref('');
const formEmailError = ref(false);
const formMessage = ref('');
const formMessageError = ref(false);
const formAction = ref(false);
const formResponse = ref('');
const loading = ref(false);

const props = defineProps({
	headline: String,
	image: Object,
	buttonText: String,
	formErrorMessage: String,
	loaderImg: String,
	viewed: Boolean
});

const getCurrentPosition = () => {
	amountScrolled.value = Math.round(window.scrollY);
};

const formSubmit = async () => {
	formAction.value = true;

	if (formName.value !== '' && formEmail.value !== '' && formMessage.value !== '') {
		loading.value = true;

		try {
			const apiURL = 'https://mailer.chrisrobertsweb.dev';
			const args = {
				headers: {
					"content-type":"application/x-www-form-urlencoded"
				},
				method: 'POST',
				mode: "cors",
				body: `from=${formEmail.value}&name=${formName.value}&message=${formMessage.value}`
			};

			const data = await fetch(apiURL, args)
			.then (response => {
				//console.log(response);
				formAction.value = true;
				formNameError.value = false;
				formEmailError.value = false;
				formMessageError.value = false;
				return response.text();
			})
			.then (
				body => {
					//console.log(body);
					formAction.value = false;
					formName.value = '';
					formEmail.value = '';
					formMessage.value = '';
					formResponse.value = body;
				}
			)

			loading.value = false;
			return data;
		}
		catch (error) {
			console.error(error);
		}
	}
	else if (formName.value === '') {
		formNameError.value = true;
	}
	else if (formEmail.value === '') {
		formEmailError.value = true;
	}
	else if (formMessage.value === '') {
		formMessageError.value = true;
	}
	else {
		formNameError.value = true;
		formEmailError.value = true;
		formMessageError.value = true;
	}
};

onMounted(() => {
	waypoint(el);
	window.addEventListener('scroll', getCurrentPosition);
});
</script>

<template>
  <section ref="el" id="contact" class="contact" :class="{viewed: viewed}">
		<a name="contact" class="jump-link"></a>
    <Heading :title="headline"></Heading>

    <div class="contact--content content">
      <div class="contact-form">
        <form v-on:submit.prevent="formSubmit">
          <div class="field-group">
            <input id="name" type="text" placeholder="NAME" v-model="formName">
            <span v-if="formAction && formName === ''" class="error">{{ formErrorMessage }}</span>
          </div>

          <div class="field-group">
            <input id="email" type="email" placeholder="EMAIL ADDRESS" v-model="formEmail">
            <span v-if="formAction && formEmail === ''" class="error">{{ formErrorMessage }}</span>
          </div>

          <div class="field-group">
            <textarea name="" id="message" placeholder="MESSAGE" v-model="formMessage"></textarea>
            <span v-if="formAction && formMessage === ''" class="error">{{ formErrorMessage }}</span>
          </div>

          <button>{{ buttonText }} <img :src="loaderImg" v-if="loading && loaderImg"></button>

          <div v-if="formResponse !== ''" class="form-response" v-html="formResponse"></div>
        </form>
        
        <picture class="contact-photo" :data-pixels="amountScrolled">
          <source v-if="image.image_2x_webp" :srcset="`${image.image_1x_webp} 1x, ${image.image_2x_webp} 2x`" type="image/webp">
          <source v-if="image.image_2x" :srcset="`${image.image_1x} 1x, ${image.image_2x} 2x`" type="image/jpeg">
          <img v-if="image.image_1x" :src="image.image_1x" alt="">
        </picture>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import '../assets/css/vars';

.contact--content.content {
	overflow: visible;
}

.contact-form {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: center;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
		color: var(--white);
		opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 */
		color: #FFF;
	}

	::-ms-input-placeholder { /* Microsoft Edge */
		color: var(--white);
	}

	form {
		display: block;
		padding: var(--space-2);
		background: var(--med-gray-alpha-alt);
		box-shadow: 0 0 90px rgba(0,0,0,0.25);
		position: absolute;
		left: 0;
		width: 50%;

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
			text-transform: uppercase;
			border: none;
			background: var(--white);
			color: var(--black);
			font-weight: 900;
			min-width: 208px;
			padding: 1rem;
			margin: auto;
			display: block;
			font-size: 1.6rem;
			min-height: 46px;
			position: relative;

			img {
				max-width: 24px;
				position: absolute;
				right: 10px;
			}

			&:hover {
				cursor: pointer;
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

@media only screen and (max-width: $lg-tablet-breakpoint) {
	.contact--content.content {
		padding: var(--space-8) 0 !important;
	}

	.contact-form {
		flex-direction: column;
		margin-top: -6.4rem;

		form {
			z-index: 10;
			width: calc(100% - var(--space-8));
			top: -75px;
			margin: 0 var(--space-4);

			textarea {
				min-height: 120px;
			}
		}
	}

	.contact-photo {
		width: 100%;
		max-width: none;
		height: 500px;
		overflow-x: hidden;
		z-index: 1;

		&:before {
			top: auto;
			bottom: 10rem;
			left: 0;
			right: 0;
			font-size: 6.4rem;
			text-align: center;
		}
		
		&:after {
			top: auto;
			bottom: 10rem;
			left: 0;
			right: 0;
			font-size: 1.4rem;
			text-align: center;
		}

		img {
			width: 100%;
		}
	}

	.contact-form form,
	.contact-photo {
		flex: 1 100%;
	}
}

@media only screen and (max-width: $tablet-breakpoint) {
	.contact-photo {
		img {
			width: auto;
		}
	}
}

@media only screen and (max-width: $phone-breakpoint) {
	.contact-form {
		margin-top: 0;
	}
}

@media only screen and (max-width: $md-phone-breakpoint) {
	.contact-form form {
		width: calc(100% - var(--space-4));
		margin: 0 var(--space-2);

		button {
			width: 100%;
			min-width: 0;
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
		}
	}
}
</style>