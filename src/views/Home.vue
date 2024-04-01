<template>
	<div class="page">
		<div class="page__container">
			<div class="page__h1">
				<h1 class="page__font page__font--h1">Stay on top of crypto. Task for front end.</h1>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.page {
	&__container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		max-width: em($container-max-width);
	}

	&__h1 {
		max-width: em(600);
	}

	&__font {
		&--h1 {
			@include dm-36-500();
			color: $white;
		}
	}
}
</style>
