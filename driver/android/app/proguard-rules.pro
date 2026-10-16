# Razorpay Android SDK Proguard Rules
-keepattributes *Annotation*
-dontwarn com.razorpay.**
-keep class com.razorpay.** {*;}
-optimizations !class/loading/findnode/*

# Prevent stripping of checkout callback methods
-keepclasseswithmembers class * {
  public void onPayment*(...);
}
