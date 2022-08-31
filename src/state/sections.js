import {ref} from 'vue';

const sections = ref({
	intro: {
		active: false,
		viewed: false,
		intersectionRatio: 0
	},
	resume: {
		active: false,
		viewed: false,
		intersectionRatio: 0
	},
	portfolio: {
		active: false,
		viewed: false,
		intersectionRatio: 0
	},
	contact: {
		active: false,
		viewed: false,
		intersectionRatio: 0
	}
});

export default sections;