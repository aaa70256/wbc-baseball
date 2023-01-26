<template>
	<div class="score">
		<div v-for="item in score">
			<div class="player-header">
				<img :src="item.photo" alt="player" />
				<div style="margin-left: 3px">
					<p>
						<span style="font-weight: bold">{{ item.name }}</span
						>-{{ item.handed }}
					</p>
					<p style="font-size: 8px">{{ item.team }}({{ item.league }})</p>
				</div>
			</div>
			<div class="content" v-if="item.IP">
				<p>IP:{{ item.IP }}</p>
				<p>W/L:{{ item.WL }}</p>
				<p>ERA:{{ item.ERA }}</p>
				<p>WHIP:{{ item.WHIP }}</p>
			</div>
			<div class="content" v-if="item.three">
				<p>打擊三圍:{{ item.three }}</p>
				<p>OPS+:{{ item.OPS }}</p>
				<p>WRC+:{{ item.WRC }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		id() {
			return this.$route.query.id;
		},
		player() {
			return this.$store.state.player;
		},
		score() {
			return this.player.filter((item) => {
				return this.id == item.id;
			});
		},
	},
};
</script>

<style scoped>
.score {
	background: linear-gradient(-45deg, #f12b08, #0d0dc1);
	color: white;
	position: fixed;
	bottom: 10px;
	left: 10;
	padding: 15px;
	border-radius: 10px;
	line-height: 1.5em;
	z-index: 101;
}
.score > p {
	font-size: 25px;
}
.player-header {
	display: flex;
	align-items: center;
}
.player-header > img {
	width: 70px;
	height: 80px;
}
.content {
	margin-left: 3px;
}
</style>
