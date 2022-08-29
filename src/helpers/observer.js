import {ref, onMounted} from 'vue';

const observer = ref(null);
const isMobile = ref('(max-width: 992px)');
const sectionName = ref('');
const config = ref({threshold: 0});

const observed = (currentSection, threshold) => {
	const emit = defineEmits(['observed']);
	emit('observed', currentSection, threshold);
};

const intersected = currentSection => {
	const emit = defineEmits(['intersected']);
	emit('intersected', currentSection);
};

const waypoint = () => {
	observer.value = new IntersectionObserver(entries => {
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
	observer,
	waypoint
}