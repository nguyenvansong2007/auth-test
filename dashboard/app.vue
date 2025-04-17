<template>
  <div>
    <!-- Header -->
    <Header />
    <div class="container lg:grid lg:grid-cols-12 lg:gap-10">
      <!-- Sidebar -->
      <Sidebar class="sticky top-[65px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block" />

      <!-- Main Section -->
      <main class="py-5 lg:col-span-6">
        <!-- Status Cards -->
        <StatusCard />
        <!-- New customer list -->
        <NewCustomers />
        <!-- Charts -->
        <SalesChart />
        <!-- Recent orders -->
        <RecentOrders />
      </main>
      <div class="hidden py-5 lg:col-span-3 lg:block">
        <!-- Profile info to the side -->
        <ProfileInfo />
        <hr class="my-5" />
        <!-- Reminders to the side -->
        <Reminders />
      </div>
    </div>
  </div>
</template>
<!-- 
<script>
// import Header from "@/components/Header.vue";
// import Sidebar from "@/components/Sidebar.vue";
// import StatusCard from "@/components/StatusCard.vue";
// import NewCustomers from "@/components/NewCustomers.vue";
// import SalesChart from "@/components/SalesChart.vue";
// import RecentOrders from "@/components/RecentOrders.vue";
// import ProfileInfo from "@/components/ProfileInfo.vue";
// import Reminders from "@/components/Reminders.vue";

export default {
  name: "App",
  // components: {
  //   Header,
  //   Sidebar,
  //   StatusCard,
  //   NewCustomers,
  //   SalesChart,
  //   RecentOrders,
  //   ProfileInfo,
  //   Reminders,
  // },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user"); // kiểm tra user đã đăng nhập chưa
    },
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/login"); // nếu chưa đăng nhập thì chuyển sang trang login
    }
  },
};
</script> -->
