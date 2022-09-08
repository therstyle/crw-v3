<script setup>
import {ref, onMounted, watch} from 'vue';
import Heading from './layout/Heading.vue';
import loadData from '../helpers/loadData';
import waypoint from '../helpers/observer';

const el = ref(null);
const contact = ref({});
const amountScrolled = ref(0);
const form = ref({
	name: '',
	nameError: false,
	email: '',
	emailError: false,
	message: '',
	messageError: false,
	honey: '',
	loading: false,
	success: false,
	status: null
});

const props = defineProps({
	viewed: Boolean
});

const getCurrentPosition = () => {
	amountScrolled.value = Math.round(window.scrollY);
};

const resetfields = () => {
	form.value.name = '';
	form.value.email = '';
	form.value.message = '';
}

const initData = async () => {
	const data = await loadData('http://crweb-api:8888/wp-json/cr/global');
	contact.value.headline = data.contact.headline;
	contact.value.image = data.contact.image;
	contact.value.buttonText = data.contact.button_text;
	contact.value.formErrorMessage = data.contact.form_error_message;
	contact.value.loaderImg = data.contact.loader_image;
}

const formSubmit = async () => {
	form.value.success = false;

	const nameError = form.value.name.length === 0;
	const emailError = form.value.name.length === 0;
	const messageError = form.value.name.length === 0;

	form.value.nameError = nameError;
	form.value.emailError = emailError;
	form.value.messageError = messageError;

	if (nameError || emailError || messageError) {return};

	form.value.loading = true;

	try {
		const body = {
			name: form.value.name,
			email: form.value.email,
			message: form.value.message,
		};

		if (form.value.honey.length > 0) {
			body.honey = form.value.honey;
		}

		const response = await fetch('https://formsubmit.co/ajax/c21474138c05ee3a77550626c88f34ee', {
			method: 'POST',
			headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    	},
			body: JSON.stringify(body)
		});

		const data = await response.json();
		form.value.status = data;
	}
	catch(e) {
		console.error(e);
	}

	form.value.loading = false;
	form.value.success = true;
	resetfields();
};

onMounted(() => {
	waypoint(el);
	window.addEventListener('scroll', getCurrentPosition);
});

watch(() => props.viewed, (viewed, oldViewed) => {
	if (viewed) {
		initData();
	}
});
</script>

<template>
  <section ref="el" id="contact" class="contact" :class="{viewed: viewed}">
		<a name="contact" class="jump-link"></a>
    <Heading :title="contact.headline"></Heading>

    <div class="contact--content content">
      <div class="contact-form">
        <form action="https://app.headlessforms.cloud/api/v1/form-submission/f7COGvPXQV" method="POST" @submit.prevent="formSubmit">
          <div class="field-group">
            <input name="name" id="name" type="text" placeholder="NAME" v-model="form.name" required>
						<span v-if="form.nameError" class="error">{{contact.formErrorMessage}}</span>
          </div>

          <div class="field-group">
            <input name="email" id="email" type="email" placeholder="EMAIL ADDRESS" v-model="form.email" required>
						<span v-if="form.emailError" class="error">{{contact.formErrorMessage}}</span>
          </div>

          <div class="field-group">
            <textarea name="message" id="message" placeholder="MESSAGE" v-model="form.message" required></textarea>
						<span v-if="form.messageError" class="error">{{contact.formErrorMessage}}</span>
          </div>

					<input type="text" name="_honey" v-model="form.honey" class="contact-form--honey">

          <button v-if="!form.success" class="button">{{ contact.buttonText }} <img :src="contact.loaderImg" v-if="form.loading && contact.loaderImg"></button>

					<p v-if="form.success" class="success">Thank you for your submission!</p>
        </form>
        
        <picture class="contact-photo" :data-pixels="amountScrolled" v-html="contact.image">
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

			&.contact-form--honey {
				display: none;
			}
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
			bottom: 5rem;
			left: 0;
			right: 0;
			font-size: 6.4rem;
			text-align: center;
		}
		
		&:after {
			top: auto;
			bottom: 5rem;
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