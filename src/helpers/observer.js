import {ref, onMounted, defineEmits} from 'vue';

const isMobile = ref('(max-width: 992px)');
const sectionName = ref('');
const config = ref({threshold: 0});
const emit = defineEmits(['observed'], ['intersected']);

const observed = (currentSection, threshold) => {
	emit('observed', currentSection, threshold);
};

const intersected = currentSection => {
	emit('intersected', currentSection);
};

const waypoint = (el) => {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.target.id) {
				sectionName.value = entry.target.id;
				observed(sectionName.value, entry.intersectionRatio);

				if (entry.isIntersecting) {
					intersected(sectionName.value);
				}
			}
		});
	}, config.value);

	observer.observe(el); //Init observing
};

const detectMobile = () => {
	if (window.matchMedia(isMobile.value).matches) {
		config.value.threshold = 0.1;
	}
	else {
		config.value.threshold = 0;
	}
}

onMounted(() => {
	detectMobile();
});

export {
	waypoint
}