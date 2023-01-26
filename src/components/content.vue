<template>
	<div class="content">
		<div class="title">
			<a href="" @click.prevent="view = !view">≡</a>
			<transition name="slide" class="list">
				<ul v-show="view" class="playerlist">
					<li
						class="player"
						v-for="item in player"
						:key="item.id"
						:class="{ active: item.status == true }"
					>
						<a href="" @click.once.prevent="pushhandler(item)"
							>{{ item.name }} - {{ item.handed }}</a
						>
					</li>
				</ul>
			</transition>
		</div>
		<div>
			<router-view />
			<img src="../assets/baseball.png" alt="field" class="field" />
			<div v-for="starting in playerIndex" :class="starting.position">
				<router-link
					:to="{ path: '/score', query: { id: starting.id } }"
					class="startingPlayer"
					>{{ starting.name }}</router-link
				>
			</div>
		</div>
		<ul class="ODsingle">
			<li style="color: red; text-align: center">中華隊 - 攻守名單</li>
			<li v-for="(player, index) in ODlist" class="ODlist" :key="player.id">
				<div>{{ index + 1 }}</div>
				<div class="playerName">{{ player.name }}</div>
				<div style="display: flex" class="delete">
					<select
						name="defense"
						id="defense"
						@change="
							positionhandler(
								index,
								$event.target.selectedIndex,
								player.name,
								player.id
							)
						"
					>
						<option for="defense" value="" selected disabled hidden>
							守備位置
						</option>
						<option for="defense" value="SP">SP</option>
						<option for="defense" value="C">C</option>
						<option for="defense" value="DH">DH</option>
						<option for="defense" value="firstbase">1B</option>
						<option for="defense" value="secondbase">2B</option>
						<option for="defense" value="thirdbase">3B</option>
						<option for="defense" value="SS">SS</option>
						<option for="defense" value="LF">LF</option>
						<option for="defense" value="CF">CF</option>
						<option for="defense" value="RF">RF</option>
					</select>
					<a href="" @click.prevent="deletehandler(index)">刪除</a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			view: false,
			playerIndex: [],
		};
	},
	computed: {
		player() {
			return this.$store.state.player;
		},
		ODlist() {
			return this.$store.state.ODlist;
		},

		// isLineStatus() {
		// 	let data = this.player;
		// 	return data.map((item) => {
		// 		return {
		// 			...item,
		// 			sss: false,
		// 		};
		// 	});
		// },
	},
	methods: {
		pushhandler(item) {
			this.$store.commit("SETOD", item);
			item.status = true;
		},
		positionhandler(index, selectedIndex, name, id) {
			let data = document.querySelectorAll("#defense");
			let data2 = data[0][selectedIndex].value;
			let data3 = this.playerIndex.map((item) => {
				return item.index;
			});
			let data4 = data3.find((item) => item == index);
			console.log(data4, data3);
			if (data4 == index) {
				this.$set(this.playerIndex[index], "position", data2);
				return;
			}
			this.playerIndex.push({
				position: data2,
				index: index,
				name: name,
				id: id,
			});
		},
		deletehandler(index) {
			this.ODlist.splice(index, 1);
			this.playerIndex.splice(index, 1);
		},
	},
	async mounted() {
		let data = await axios.get("./player.json");
		this.$store.dispatch("GETPLAYERAPI", data.data);
		this.$set(this.player, "OK", "false");
		this.$router.replace({ path: "/" });
	},
};
</script>

<style scoped>
.content {
	background-image: url(https://i.imgur.com/7PZO8l4.jpg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	width: 1280px;
	height: 630px;
	display: flex;
	position: relative;
}
.title a {
	text-decoration: none;
	color: gray;
	font-weight: bold;
	font-size: 50px;
	display: block;
	padding: 5px;
}
.content img {
	width: 800px;
	height: 610px;
	margin-left: 50px;
}
.playerlist {
	margin-left: 5px;
	position: absolute;
	top: 50px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 390px;
	z-index: 100;
}
.player {
	background-color: aliceblue;
}
.player > a:hover {
	color: red;
	background-color: #e8e8e8;
}

.player > a {
	text-align: center;
	font-size: 10px;
	text-decoration: none;
	color: darkcyan;
	display: block;
	border-bottom: 1px solid #e8e8e8;
	padding-left: 10px;
	padding-right: 10px;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(-10px);
	opacity: 0;
}
.slide-enter-active {
	transition: all 0.3s ease;
}
.slide-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.3, 0.3, 1);
}
.active {
	text-decoration: line-through;
	background-color: #e8e8e8;
}
.ODsingle {
	margin-left: 50px;
	margin-top: 50px;
	height: 509px;
	width: 280px;
	background-color: #e8e8e8;
	border: 1px solid black;
}
.ODsingle > li {
	margin-top: 15px;
	font-size: 20px;
	font-weight: bold;
	border-bottom: 1px solid white;
	padding-bottom: 10px;
}
.ODlist {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.playerName {
	color: blue;
}
#defense {
	font-weight: bold;
	text-align: center;
	background-color: red;
	color: whitesmoke;
	width: 80px;
}
.field {
	position: relative;
}
.SP {
	position: absolute;
	bottom: 36%;
	left: 37%;
}
.DH {
	position: absolute;
	bottom: 22%;
	left: 25%;
}
.C {
	position: absolute;
	bottom: 22%;
	left: 37%;
}
.firstbase {
	position: absolute;
	bottom: 36%;
	right: 45%;
}
.thirdbase {
	position: absolute;
	bottom: 36%;
	left: 24%;
}
.secondbase {
	position: absolute;
	bottom: 48%;
	right: 50%;
}
.SS {
	position: absolute;
	bottom: 50%;
	left: 30%;
}
.LF {
	position: absolute;
	bottom: 65%;
	left: 20%;
}
.CF {
	position: absolute;
	bottom: 80%;
	left: 35%;
}
.RF {
	position: absolute;
	bottom: 65%;
	right: 43%;
}
.delete > a {
	color: darkcyan;
	font-size: 15px;
}
.delete > a:hover {
	color: blueviolet;
}
.startingPlayer {
	font-size: 30px;
	font-weight: bold;
	text-decoration: none;
	color: yellow;
}
.router-link-exact-active {
	color: red;
}
</style>
