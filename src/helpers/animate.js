import {ref} from 'vue';

const viewed = ref(false);

const animate = (settings, el) => {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				viewed.value = true;
				observer.unobserve(entry.target);
			}
		});
	}, settings);

	observer.observe(el); //Init observer
}

export {
	viewed,
	animate
}