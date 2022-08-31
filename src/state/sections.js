import {ref} from 'vue';

const sections = ref({
	intro: {
		active: false,
		viewed: false,
		threshold: 0
	},
	resume: {
		active: false,
		viewed: false,
		threshold: 0
	},
	portfolio: {
		active: false,
		viewed: false,
		threshold: 0
	},
	contact: {
		active: false,
		viewed: false,
		threshold: 0
	}
});

export default sections;